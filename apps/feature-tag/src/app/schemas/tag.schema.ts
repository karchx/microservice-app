import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

/**
 * The tag mongoose schema
 */
@Schema()
export class Tag {
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  tagName: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
