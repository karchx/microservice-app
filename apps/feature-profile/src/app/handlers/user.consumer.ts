import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { QueueEvents, Queues, UserDto } from '@microservice-app/models';
import { ProfileService } from '../profile.service';

/*
 * This class handles EvaluateTags message on the Tags queue
 */
@Processor(Queues.Users)
@Injectable()
export class UserConsumer {
  constructor(private readonly profileService: ProfileService) {}

  @Process(QueueEvents.UserUpdate)
  async handleUserUpdate(job: Job) {
    const user: UserDto = job.data;
    return await this.profileService.upsert(user);
  }
}
