import { ArticleDto } from '@microservice-app/models';
import { PromisifyHttpService } from '@microservice-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArticleService {
  articleFeatureBaseUrl: string;
  userFeatureBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private promisifyHttp: PromisifyHttpService
  ) {
    this.userFeatureBaseUrl = this.configService.get<string>(
      'features.user.baseUrl'
    );
    this.articleFeatureBaseUrl = this.configService.get<string>(
      'features.article.baseUrl'
    );
  }

  async getUserArticle(username: string): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles?author=${username}`;
    return this.promisifyHttp.get(url);
  }

  async getUserFeed(authHeader: any): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles/feed`;
    return this.promisifyHttp.get(url, { headers: authHeader });
  }
}
