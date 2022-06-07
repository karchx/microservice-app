import { Injectable } from '@nestjs/common';
import { TokenDto, UserDto } from '@microservice-app/models';

@Injectable()
export class AuthService {
  /**
   * @param user UserDto
   *
   * @return Promise<TokenDto>
   */
  async login(user: UserDto): Promise<TokenDto> {
    const payload = { username: user.email, sub: user._id };
    return { access_token: '1111' };
  }
}
