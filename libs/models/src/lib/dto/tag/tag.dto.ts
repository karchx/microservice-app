import { ObjectId } from 'mongodb';

export class TagDto {
  readonly _id: ObjectId;
  readonly tagName: string;
}
