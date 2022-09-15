import { JwtAuthGuard } from '@microservice-app/auth';
import {
  ArticleDto,
  CommentDto,
  CreateArticleCommentDto,
  CreateArticleDto,
  FindAllArticleQueryDto,
  UpdateArticleDto,
} from '@microservice-app/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @UseGuards(JwtAuthGuard)
  @Put('/:slug')
  updateArticle(
    @Req() req: any,
    @Body() body: UpdateArticleDto,
    @Param('slug') slug: string
  ): Promise<ArticleDto | null> {
    return this.articleService.update(slug, body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:slug')
  deleteArticle(
    @Req() req: any,
    @Param('slug') slug: string
  ): Promise<ArticleDto> {
    return this.articleService.delete(slug, req.user);
  }

  /**
   * Creates a comment on an article
   *
   * @param req the request
   * @param body CreateArticleCommentDto
   * @param slug the title slug
   * @returns the create comment = CommentDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Post('/:slug/comments')
  addComment(
    @Req() req: any,
    @Body() body: CreateArticleCommentDto,
    @Param('slug') slug: string
  ): Promise<CommentDto | null> {
    return this.articleService.addComment(slug, body, req.user);
  }

  /**
   * Returns all article comments
   *
   * @param slug the title slug
   * @returns the article comments - CommentDto[]
   */
  @Get('/:slug/comments')
  getComments(@Param('slug') slug: string): Promise<CommentDto[]> {
    return this.articleService.getComments(slug);
  }

  /**
   * Deletes a comments
   *
   * @param req the request
   * @param id the comment id
   * @returns the delete comment - CommentDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:id/comments')
  deleteComment(
    @Req() req: any,
    @Param('id') id: string
  ): Promise<CommentDto | null> {
    return this.articleService.deleteComment(id, req.user);
  }

  /**
   * Adds a favorite to an article
   *
   * @param slug the title slug
   * @returns the updated article = ArticleDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Post('/:slug/favorite')
  addFavorite(@Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.modifyFavorite(slug, 'Increment');
  }

  /**
   * Removes a favorite from an article
   *
   * @param slug the title slug
   * @returns the update article - ArticleDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:slug/favorite')
  removeFavorite(@Param('slug') slug: string): Promise<ArticleDto | null> {
    return this.articleService.modifyFavorite(slug, 'Decrement');
  }
}
