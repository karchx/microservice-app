import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

import { Queues } from '@microservice-app/models';
import { AuthModule } from '@microservice-app/auth';
import { SharedModule } from '@microservice-app/shared';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article, ArticleSchema } from './schemas/article.schema';
import { CommentSchema } from './schemas/comment.schema';

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
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
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
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class AppModule {}
