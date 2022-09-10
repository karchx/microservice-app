import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Model } from 'mongoose';
import { Queue } from 'bull';
import {
  CreateUserDto,
  QueueEvents,
  Queues,
  UpdateUserDto,
  UserDto,
} from '@microservice-app/models';
import { User, UserDocument } from './schemas/user.schema';
import { Hash } from '@microservice-app/shared';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectQueue(Queues.Users) private usersQueue: Queue
  ) {}

  async findAll(usernames?: string): Promise<UserDto[]> {
    if (usernames) {
      const usernameArray = usernames.split(',').map((item) => item.trim());
      return await this.userModel
        .find({ username: { $in: usernameArray } })
        .exec();
    } else {
      return await this.userModel.find().exec();
    }
  }

  async findByIds(ids: string) {
    const idArray = ids.split(',').map((item) => item.trim());
    const users = await this.userModel
      .find({ _id: { $in: idArray } })
      .lean()
      .exec();

    return users;
  }

  async upsert(body: UpdateUserDto | CreateUserDto): Promise<UserDto | null> {
    const passwordEncrypt = Hash.make(body.password);
    const update = {
      ...body,
      password: passwordEncrypt,
      updatedAt: new Date(),
    };

    const user: User = await this.userModel.findOneAndUpdate(
      { email: body.email },
      update,
      { new: true, useFindAndModify: false, upsert: true }
    );

    if (user) {
      // publish the updated user in a message on the Users queue
      await this.usersQueue.add(QueueEvents.UserUpdate, {
        username: user.username,
        bio: user.bio,
        image: user.image,
      });
    }

    return user;
  }

  getData(): { message: string } {
    return { message: 'Welcome to feature-user!' };
  }
}
