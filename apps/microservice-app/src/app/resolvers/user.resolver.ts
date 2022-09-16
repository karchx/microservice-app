import {
  Resolver,
  Query,
  Context,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';
import { UserCreateInput } from '../models/userCreate.input';
import { UserUpdateInput } from '../models/userUpdate.input';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private articleService: ArticleService
  ) {}

  @Query(() => User, { name: 'user' })
  async getUser(
    @Args('id', { nullable: true }) id?: string,
    @Args('username', { nullable: true }) username?: string,
    @Args('email', { nullable: true }) email?: string
  ) {
    return this.userService.getUser(id, username, email);
  }

  @Query(() => User, { name: 'me' })
  async getMe(@Context() ctx: ExtendedGqlExecutionContext) {
    const authHeader = {
      Authorization: `Bearer ${ctx.token}`,
    };

    return this.userService.getMe(authHeader);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: UserCreateInput) {
    return this.userService.create(createUserData);
  }

  @Mutation(() => User)
  async updateUser(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Args('updateUserData') updateUserData: UserUpdateInput
  ) {
    const authHeader = {
      Authorization: `Bearer ${ctx.token}`,
    };

    return this.userService.update(updateUserData, authHeader);
  }

  @ResolveField(() => [Article], { name: 'articles' })
  async getArticles(@Parent() user: User) {
    const { username } = user;
    return this.articleService.getUserArticle(username);
  }

  @ResolveField(() => [Article], { name: 'feed' })
  async getFeed(
    @Context() ctx: ExtendedGqlExecutionContext,
    @Parent() user: User
  ) {
    const authHeader = {
      Authorization: `Bearer ${ctx.token}`,
    };

    return this.articleService.getUserFeed(authHeader);
  }
}
