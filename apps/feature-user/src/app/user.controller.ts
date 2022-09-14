import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@microservice-app/auth';

import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '@microservice-app/models';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getMet(@Req() req): Promise<UserDto> {
    return req.user;
  }

  /**
   * Returns all users
   *
   * @returns UserDto[]
   */

  @Get('/users')
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  /**
   * Returns users by usernames
   *
   * @param usernames usernames route param
   * @returns UserDto | null
   */

  @Get('/usernames/:usernames')
  getUserByUsernames(
    @Param('usernames') usernames: string
  ): Promise<UserDto[]> {
    return this.userService.findAll(usernames);
  }

  @Get('/users/ids/:ids')
  getUsersByIds(@Param('ids') ids: string) {
    return this.userService.findByIds(ids);
  }

  /**
   * Returns user by id
   *
   * @param id id route param
   * @returns UserDto | null
   */
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.findById(id);
  }

  /**
   * Returns user by username
   *
   * @param username username route param
   * @returns UserDto | null
   */
  @Get('/username/:username')
  getUserByUsername(
    @Param('username') username: string
  ): Promise<UserDto | null> {
    return this.userService.findOne({ username });
  }

  /**
   * Returns user by email
   *
   * @param email email route param
   * @returns UserDto | null
   */
  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string): Promise<UserDto | null> {
    return this.userService.findOne({ email });
  }

  /**
   * Creates a new user
   *
   * @param body CreateUserDto
   * @returns UserDto | null
   */
  @Post('/')
  createUser(@Body() body: CreateUserDto): Promise<UserDto | null> {
    return this.userService.upsert(body);
  }

  /**
   * Updates a user
   *
   * @param body UpdateUserDto
   * @returns UserDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Put('/')
  updateUser(@Body() body: UpdateUserDto): Promise<UserDto | null> {
    return this.userService.upsert(body);
  }

  @Get()
  getData() {
    return this.userService.getData();
  }
}
