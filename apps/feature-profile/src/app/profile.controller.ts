import { Controller, Get } from '@nestjs/common';

import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getData() {
    return this.profileService.getData();
  }
}
