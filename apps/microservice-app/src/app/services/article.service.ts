import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ArticleDto } from '@microservice-app/models';
import { PromisifyHttpService } from '@microservice-app/shared';
import { Comment } from '../models/comment.model';
import { ArticleCreateInput } from '../models/articleCreate.input';
import { ArticleUpdateInput } from '../models/articleUpdate.input';
import { CommentDeleteInput } from '../models/commentDelete.input';
import { CommentCreateInput } from '../models/commentCreate.input';

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

  async getArticle(slug: string): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles/${slug}`;
    const article: ArticleDto = await this.promisifyHttp.get(url);
    return [article];
  }

  async getAllArticles(): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles`;
    return this.promisifyHttp.get(url);
  }

  async getUserArticle(username: string): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles?author=${username}`;
    return this.promisifyHttp.get(url);
  }

  async getUserFeed(authHeader: any): Promise<ArticleDto[]> {
    const url = `${this.articleFeatureBaseUrl}/articles/feed`;
    return this.promisifyHttp.get(url, { headers: authHeader });
  }

  async getArticleComment(slug: string): Promise<Comment[]> {
    const url = `${this.articleFeatureBaseUrl}/articles/${slug}/comments`;
    const comments: Comment[] = await this.promisifyHttp.get(url);
    const authorIds: string = comments
      .reduce((acc, comment) => {
        acc.push(comment.authorId);
        return acc;
      }, [])
      .join(',');
    const users = await this.promisifyHttp.get(
      `${this.userFeatureBaseUrl}/user/users/ids/${authorIds}`
    );

    const populatedComments = comments.map((comment) => {
      comment.author = users[comment.authorId];
      return comment;
    });

    return populatedComments;
  }

  async delete(slug: string, authHeader: any): Promise<ArticleDto> {
    const url = `${this.articleFeatureBaseUrl}/articles/${slug}`;
    return this.promisifyHttp.delete(url, { headers: authHeader });
  }

  async create(
    input: ArticleCreateInput,
    authHeader: any
  ): Promise<ArticleDto> {
    const url = `${this.articleFeatureBaseUrl}/articles`;
    return this.promisifyHttp.post<ArticleCreateInput>(url, input, {
      headers: authHeader,
    });
  }

  async update(
    input: ArticleUpdateInput,
    authHeader: any
  ): Promise<ArticleDto> {
    const url = `${this.articleFeatureBaseUrl}/articles/${input.slug}`;
    return this.promisifyHttp.put<ArticleUpdateInput>(url, input, {
      headers: authHeader,
    });
  }

  async createComment(
    input: CommentCreateInput,
    authHeader: any
  ): Promise<ArticleDto> {
    const url = `${this.articleFeatureBaseUrl}/articles/${input.slug}/comments`;
    return this.promisifyHttp.post<CommentCreateInput>(url, input, {
      headers: authHeader,
    });
  }

  async deleteComment(
    input: CommentDeleteInput,
    authHeader: any
  ): Promise<ArticleDto> {
    const url = `${this.articleFeatureBaseUrl}/articles/${input.id}/comments`;
    return this.promisifyHttp.delete(url, { headers: authHeader });
  }

  async addFavorite(slug: string, authHeader: any): Promise<ArticleDto> {
    const url = `${this.articleFeatureBaseUrl}/articles/${slug}/favorite`;
    return this.promisifyHttp.post<{}>(url, {}, { headers: authHeader });
  }

  async removeFavorite(slug: string, authHeader: any): Promise<ArticleDto> {
    const url = `${this.articleFeatureBaseUrl}/articles/${slug}/favorite`;
    return this.promisifyHttp.delete(url, { headers: authHeader });
  }
}
