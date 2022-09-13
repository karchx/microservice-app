import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

import { SharedModule } from '@microservice-app/shared';
import { AuthModule } from '@microservice-app/auth';
import { Queues } from '@microservice-app/models';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag, TagSchema } from './schemas/tag.schema';
import { EvaluateTagsConsumer } from './handlers/evaluateTags.consumer';

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
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
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
      name: Queues.Tags,
    }),
    AuthModule,
  ],
  controllers: [TagController],
  providers: [TagService, EvaluateTagsConsumer],
})
export class AppModule {}
