import {
  ArticleDto,
  CreateArticleDto,
  QueueEvents,
  Queues,
  UserDto,
} from '@microservice-app/models';
import { StringUtilService } from '@microservice-app/shared';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectQueue(Queues.Tags) private tagsQueue: Queue,
    private stringUtilsService: StringUtilService
  ) {}

  async create(
    body: CreateArticleDto,
    user: UserDto
  ): Promise<ArticleDto | null> {
    const { tagList } = body;

    if (tagList && tagList.length) {
      await this.tagsQueue.add(QueueEvents.EvaluateTags, {
        tagList,
      });
    }

    // save the new article
    const article = {
      ...body,
      authorId: user._id,
      slug: this.stringUtilsService.slugify(body.title),
    };
    return await this.articleModel.create(article);
  }
}
