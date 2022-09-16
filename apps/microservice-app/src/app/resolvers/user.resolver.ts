import { Resolver, Query, Context, Args, Mutation } from '@nestjs/graphql';
import { ExtendedGqlExecutionContext } from '../extended-gql-context';
import { User } from '../models/user.model';
import { UserCreateInput } from '../models/userCreate.input';
import { UserUpdateInput } from '../models/userUpdate.input';
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
}
