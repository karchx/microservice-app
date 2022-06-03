import { UserService } from '../services/user.service';

export class UserResolver {
  constructor(private userService: UserService) {}
}
