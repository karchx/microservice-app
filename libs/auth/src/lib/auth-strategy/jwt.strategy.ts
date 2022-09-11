import { PromisifyHttpService } from '@microservice-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  userFeatureBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private promisifyHttpService: PromisifyHttpService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.secret'),
    });
    this.userFeatureBaseUrl = this.configService.get<string>(
      'features.user.baseUrl'
    );
  }

  async validate(payload: any) {
    return await this.promisifyHttpService.get(
      `${this.userFeatureBaseUrl}/user/email/${payload.username}`
    );
  }
}
