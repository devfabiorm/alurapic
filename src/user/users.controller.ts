import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  private userService = new UserService();

  @Post()
  create(@Body() user) {
    const createdUser = this.userService.create(user);

    return createdUser;
  }
}
