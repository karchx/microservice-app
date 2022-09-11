import { Injectable } from '@nestjs/common';
import { TokenDto, UserDto } from '@microservice-app/models';
import { Hash, PromisifyHttpService } from '@microservice-app/shared';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  userFeatureBaeUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly promisifyHttpService: PromisifyHttpService
  ) {
    this.userFeatureBaeUrl = this.configService.get<string>(
      'features.user.baseUrl'
    );
  }

  /**
   * NOTE: encrypt
   */

  async validateUser(email: string, password: string) {
    const user = await this.promisifyHttpService.get(
      `${this.userFeatureBaeUrl}/user/email/${email}`
    );
    const isValidPassword = Hash.compare(password, user.password);

    if (user && isValidPassword) {
      return user;
    }
    return null;
  }

  /**
   * @param user UserDto
   *
   * @return Promise<TokenDto>
   */
  async login(user: UserDto): Promise<TokenDto> {
    const payload = { username: user.email, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
