import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  getData(): { message: string } {
    return { message: 'Welcome to feature-tag!' };
  }
}
