import { AuthModule } from '@microservice-app/auth';
import { SharedModule } from '@microservice-app/shared';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user.service';

@Module({
  imports: [AuthModule, SharedModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
