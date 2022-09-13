import { CreateTagDto, TagDto } from '@microservice-app/models';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { TagService } from './tag.service';

@Controller('/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * Returns all tags
   *
   * @returns string[]
   */
  @Get()
  listTags(): Promise<string[]> {
    return this.tagService.findAll();
  }

  /**
   * Creates a tag
   *
   * @param body CreateTagDto
   * @returns TagDto | null
   */
  @Post()
  create(@Body() body: CreateTagDto): Promise<TagDto | null> {
    return this.tagService.create(body);
  }
}
