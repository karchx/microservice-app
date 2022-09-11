import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProfileDto, UserDto } from '@microservice-app/models';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>
  ) {}

  /**
   *
   * Returns the  profile related to the username, and also if the current
   * user is following the username
   *
   * @param username the username realated to the requested profile
   * @param user the current user
   * @returns ProfileDto
   */
  async findOne(username: string, user: UserDto): Promise<ProfileDto | null> {
    const profile: Profile = await this.profileModel
      .findOne({ username })
      .exec();

    const following: boolean = profile.followers.includes(user.username);

    return {
      _id: profile._id,
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
      following,
    };
  }

  async upsert(user: UserDto): Promise<ProfileDto | null> {
    const update = {
      followers: [],
      username: user.username,
      bio: user.bio,
      image: user.image,
    };

    return await this.profileModel.findOneAndUpdate(
      { username: user.username },
      update,
      { new: true, useFindAndModify: false, upsert: true }
    );
  }
}
