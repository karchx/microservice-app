import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SharedModule } from '@microservice-app/shared';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';
import { BullModule } from '@nestjs/bull';
import { Queues } from '@microservice-app/models';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('queue.host'),
          port: configService.get<number>('queue.port'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: Queues.Users,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
