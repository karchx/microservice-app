import { TokenDto } from '@microservice-app/models';
import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Request() req): Promise<TokenDto> {
    return this.authService.login(req.body);
  }
}
