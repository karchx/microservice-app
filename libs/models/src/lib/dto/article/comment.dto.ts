import { ObjectId } from 'mongodb';

export class CommentDto {
  readonly _id: ObjectId;
  readonly authorId: ObjectId;
  readonly articleId: ObjectId;
  readonly body: string;
  readonly createdAt: Date;
  readonly deletedAt: Date;
}
