import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../models/login.input';
import { Token } from '../models/token.model';
import { UserService } from '../services/user.service';

@Resolver((of) => Token)
export class LoginResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => Token)
  async login(@Args('loginData') loginData: LoginInput) {
    return this.userService.login(loginData);
  }
}
