import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SharedModule } from '@microservice-app/shared';
import { Queues } from '@microservice-app/models';
import { AuthModule } from '@microservice-app/auth';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { UserConsumer } from './handlers/user.consumer';

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
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
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
    AuthModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UserConsumer],
})
export class AppModule {}
