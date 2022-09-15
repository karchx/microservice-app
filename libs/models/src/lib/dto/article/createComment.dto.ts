import { IsNotEmpty } from 'class-validator';

export class CreateArticleCommentDto {
  @IsNotEmpty()
  readonly body: string;
}
