import { JwtAuthGuard } from '@microservice-app/auth';
import {
  ArticleDto,
  CreateArticleDto,
  FindAllArticleQueryDto,
} from '@microservice-app/models';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PageDto } from 'libs/models/src/lib/dto/base';

import { ArticleService } from './article.service';

@Controller('/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * GET /api/articles
   * Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results
   * Query Parameters:
   *  Filter by tag: ?tag=AngularJS
   *  Filter by author: ?author=jake
   *  Favorited by user: ?favorited=jake
   *  Limit number of articles (default is 20): ?limit=20
   *  Offset/skip number of articles (default is 0): ?offset=0
   * Authentication optional, will return multiple articles, ordered by most recent first
   */
  @Get('/')
  listArticles(@Query() query: FindAllArticleQueryDto): Promise<ArticleDto[]> {
    return this.articleService.findAll(query);
  }

  /**
   * will return multiple articles created by followed users, ordered by most
   * recent first.
   * @param req
   * @param query
   */
  @UseGuards(JwtAuthGuard)
  @Get('/feed')
  getUserFeed(
    @Req() req: any,
    @Query() query?: PageDto
  ): Promise<ArticleDto[]> {
    return this.articleService.feed(req.user, query);
  }

  @Get('/:slug')
  getArticle(@Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  createArticle(
    @Body() body: CreateArticleDto,
    @Req() req: any
  ): Promise<ArticleDto | null> {
    return this.articleService.create(body, req.user);
  }
}
