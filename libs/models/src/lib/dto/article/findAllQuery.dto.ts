import { ObjectId } from 'mongodb';
import { PageDto } from '../base';

export class FindAllArticleQueryDto extends PageDto {
  readonly tag: string;
  readonly author: ObjectId;
  readonly favorited: string;
}
