import { UserDto } from '@microservice-app/models';
import { PromisifyHttpService } from '@microservice-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginInput } from '../models/login.input';
import { UserCreateInput } from '../models/userCreate.input';
import { UserUpdateInput } from '../models/userUpdate.input';

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

  async getUser(
    id?: string,
    username?: string,
    email?: string
  ): Promise<UserDto> {
    let url: string;

    if (id) {
      url = `${this.userFeatureBaseUrl}/user/${id}`;
    }

    if (username) {
      url = `${this.userFeatureBaseUrl}/user/username/${username}`;
    }

    if (email) {
      url = `${this.userFeatureBaseUrl}/user/email/${email}`;
    }

    return this.promisifyHttp.get(url);
  }

  async getMe(authHeader: any): Promise<UserDto> {
    const url = `${this.userFeatureBaseUrl}/user`;
    return this.promisifyHttp.get(url, { headers: authHeader });
  }

  async create(input: UserCreateInput): Promise<UserDto> {
    const url = `${this.userFeatureBaseUrl}/user`;
    return this.promisifyHttp.post<UserCreateInput>(url, input);
  }

  async update(input: UserUpdateInput, authHeader: any): Promise<UserDto> {
    const url = `${this.userFeatureBaseUrl}/user`;
    return this.promisifyHttp.put<UserUpdateInput>(url, input, {
      headers: authHeader,
    });
  }
}
