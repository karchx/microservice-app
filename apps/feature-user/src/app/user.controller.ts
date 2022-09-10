import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '@microservice-app/models';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @Put('/')
  updateUser(@Body() body: UpdateUserDto): Promise<UserDto | null> {
    return this.userService.upsert(body);
  }

  @Get()
  getData() {
    return this.userService.getData();
  }
}
