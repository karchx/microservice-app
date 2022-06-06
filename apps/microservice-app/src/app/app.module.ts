import { AuthModule } from '@microservice-app/auth';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
