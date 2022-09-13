import { ObjectId } from 'mongodb';

export class ArticleDto {
  readonly _id: ObjectId;
  readonly slug: string;
  readonly authorId: ObjectId;
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
  readonly favoritesCount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}
