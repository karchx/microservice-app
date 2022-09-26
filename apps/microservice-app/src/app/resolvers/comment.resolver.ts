import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { Comment } from '../models/comment.model';
import { CommentCreateInput } from '../models/commentCreate.input';
import { CommentDeleteInput } from '../models/commentDelete.input';
import { User } from '../models/user.model';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(
    private articlesService: ArticleService,
    private userService: UserService
  ) {}

  @Mutation(() => Comment)
  async createComment(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('createCommentData') createCommentData: CommentCreateInput
  ) {
    const authHeader = {
      Authorization: `Bearer ${ctx.token}`,
    };
    return this.articlesService.createComment(createCommentData, authHeader);
  }

  @Mutation(() => Comment)
  async deleteComment(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('deleteCommentData') deleteCommentData: CommentDeleteInput
  ) {
    const authHeader = {
      Authorization: `Bearer ${ctx.token}`,
    };

    return this.articlesService.deleteComment(deleteCommentData, authHeader);
  }

  @ResolveField(() => User, { name: 'author' })
  async getUser(@Parent() comment: Comment) {
    const { authorId } = comment;
    return this.userService.getUser(authorId);
  }
}
