import { JwtAuthGuard } from '@microservice-app/auth';
import { ProfileDto } from '@microservice-app/models';
import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:username')
  getProfile(
    @Req() req: any,
    @Param('username') username: string
  ): Promise<ProfileDto | null> {
    return this.profileService.findOne(username, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:username/follow')
  addFavorite(
    @Req() req: any,
    @Param('username') username: string
  ): Promise<ProfileDto | null> {
    return this.profileService.modifyFollow(username, req.user, 'FOLLOW');
  }
}
