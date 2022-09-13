import { Process, Processor } from '@nestjs/bull';
import { QueueEvents, Queues } from '@microservice-app/models';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { TagService } from '../tag.service';
import { difference } from 'lodash';

@Processor(Queues.Tags)
@Injectable()
export class EvaluateTagsConsumer {
  constructor(private readonly tagService: TagService) {}

  @Process(QueueEvents.EvaluateTags)
  async evaluateTags(job: Job) {
    const { tagList } = job.data;

    const tags = await this.tagService.findAll();
    const delta = difference(tagList, tags);

    return await this.tagService.batchCreate(
      delta.map((item) => ({ tagName: item }))
    );
  }
}
