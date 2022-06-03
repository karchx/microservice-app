import { Injectable } from '@nestjs/common';

interface LoginInput {
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  private mockData: LoginInput = {
    email: 'teste@gmail.com',
    password: '123456789',
  };

  login(input: LoginInput): LoginInput {
    if (input.email === this.mockData.email) {
      return input;
    }
    return;
  }
}
