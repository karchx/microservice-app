import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@microservice-app/auth';
import { ProfileDto } from '@microservice-app/models';
import {CloudinaryService} from './cloudinary.service';

import { ProfileService } from './profile.service';

@Controller('/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService, private readonly cloudinaryService: CloudinaryService) {}

  /**
   * Returns user profileService
   */
  @UseGuards(JwtAuthGuard)
  @Get('/:username')
  getProfile(
    @Req() req: any,
    @Param('username') username: string
  ): Promise<ProfileDto | null> {
    return this.profileService.findOne(username, req.user);
  }

  /**
   * Adds a follow to a username
   *
   * @param username the username to follow
   * @returns the updated profile ProfileDto
   */
  @UseGuards(JwtAuthGuard)
  @Post('/:username/follow')
  addFavorite(
    @Req() req: any,
    @Param('username') username: string
  ): Promise<ProfileDto | null> {
    return this.profileService.modifyFollow(username, req.user, 'FOLLOW');
  }

  /**
   * Remove a follow to a username
   *
   * @param username the username to follow
   * @returns the updated profile ProfileDto
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:username/unfollow')
  removeFavorite(
    @Req() req: any,
    @Param('username') username: string
  ): Promise<ProfileDto | null> {
    return this.profileService.modifyFollow(username, req.user, 'UNFOLLOW');
  }

  @Get('/:username/follows')
  getProfilleFollowedByUser(@Param('username') username: string) {
    return this.profileService.getProfilleFollowedByUser(username);
  }

  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file);
  }
}
