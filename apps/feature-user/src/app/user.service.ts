import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '@microservice-app/models';
import { User, UserDocument } from './schemas/user.schema';
import { Hash } from '@microservice-app/shared';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
      //TODO: add queue
    }

    return user;
  }

  getData(): { message: string } {
    return { message: 'Welcome to feature-user!' };
  }
}
