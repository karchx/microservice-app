import { JwtAuthGuard } from '@microservice-app/auth';
import { ArticleDto, CreateArticleDto } from '@microservice-app/models';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { ArticleService } from './article.service';

@Controller('/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  createArticle(
    @Body() body: CreateArticleDto,
    @Req() req: any
  ): Promise<ArticleDto | null> {
    return this.articleService.create(body, req.user);
  }
}
