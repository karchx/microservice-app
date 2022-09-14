import {
  ArticleDto,
  CreateArticleDto,
  FindAllArticleQueryDto,
  QueueEvents,
  Queues,
  UserDto,
} from '@microservice-app/models';
import {
  PromisifyHttpService,
  StringUtilService,
} from '@microservice-app/shared';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticleService {
  userFeatureBaseUrl: string;
  profileFeatureBaseUrl: string;

  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectQueue(Queues.Tags) private tagsQueue: Queue,
    private stringUtilsService: StringUtilService,
    private promisifyHttp: PromisifyHttpService,
    private configService: ConfigService
  ) {
    this.userFeatureBaseUrl = this.configService.get<string>(
      'features.user.baseUrl'
    );
  }

  async isUserArticleAuthor(user: UserDto, slug: string) {
    const article: ArticleDto = await this.articleModel
      .findOne({ slug })
      .exec();

    if (!article || !article.authorId.equals(user._id)) {
      throw new UnauthorizedException();
    }
  }

  async findAll(queryParams: FindAllArticleQueryDto): Promise<ArticleDto[]> {
    const query: any = {};
    if (queryParams.tag) {
      query.tagList = queryParams.tag;
    }
    if (queryParams.author) {
      const author: UserDto = await this.promisifyHttp.get(
        `${this.userFeatureBaseUrl}/user/username/${queryParams.author}`
      );
      query.authorId = author._id;
    }

    const limit = parseInt(queryParams.limit) || 20;
    const offset = parseInt(queryParams.offset) || 0;

    return await this.articleModel.find(query).skip(offset).limit(limit).exec();
  }

  async findOne(slug: string): Promise<ArticleDto | null> {
    return await this.articleModel.findOne({ slug }).exec();
  }

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
