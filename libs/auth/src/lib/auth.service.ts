import { Injectable } from '@nestjs/common';
import { TokenDto } from '@microservice-app/models'

@Injectable()
export class AuthService {
  /**
   *
   */
  async login(): Promise<TokenDto> {
    return { access_token: '1111' }
  }
}
