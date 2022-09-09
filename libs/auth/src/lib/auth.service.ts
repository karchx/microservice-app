import { Injectable } from '@nestjs/common';
import { TokenDto, UserDto } from '@microservice-app/models';
import { PromisifyHttpService } from '@microservice-app/shared';
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

  validateUser(username: string, password: string) {
    return this.promisifyHttpService
      .get<UserDto | null>(`${this.userFeatureBaeUrl}/user/email/${username}`)
      .subscribe({
        next(value) {
          if (value && value.password === password) {
            return value;
          }
        },
        error() {
          return null;
        },
      });
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
