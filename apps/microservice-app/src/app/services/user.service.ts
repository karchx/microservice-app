import { PromisifyHttpService } from '@microservice-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginInput } from '../models/login.input';

@Injectable()
export class UserService {
  userFeatureBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private promisifyHttp: PromisifyHttpService
  ) {
    this.userFeatureBaseUrl = this.configService.get<string>(
      'features.user.baseUrl'
    );
  }

  async login(input: LoginInput) {
    const url = `${this.userFeatureBaseUrl}/auth/login`;
    return this.promisifyHttp.post(url, input);
  }
}
