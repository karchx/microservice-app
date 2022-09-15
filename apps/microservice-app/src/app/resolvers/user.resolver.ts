import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

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
}
