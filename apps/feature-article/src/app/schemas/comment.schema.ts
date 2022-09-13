import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  _id: ObjectId;

  @Prop({ required: true })
  authorId: ObjectId;

  @Prop({ required: true })
  articleId: ObjectId;

  @Prop({ required: true })
  body: string;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
