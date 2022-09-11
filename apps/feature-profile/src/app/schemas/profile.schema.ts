import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  _id: ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop()
  bio: string;

  @Prop()
  image: string;

  @Prop({ default: [] })
  followers: string[];

  following: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
