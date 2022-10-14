import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
//import { KeycloakAuthGuard } from 'src/auth/keycloak-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { User } from './user.entity';
import { MalUser, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post()
  create(@Body() user: User): NestResponse {
    const createdUser = this.userService.create(user);

    return new NestResponseBuilder()
      .status(HttpStatus.CREATED)
      .headers({ Location: `users/${createdUser.username}` })
      .body(createdUser)
      .build();
  }

  @Get(':username')
  //@UseGuards(JwtAuthGuard)
  //@UseGuards(KeycloakAuthGuard)
  getProfile(@Param('username') username: string): User {
    const user = this.userService.findOne(username);

    if (!user) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `User ${username} not found.`,
      });
    }

    return user;
  }

  @Get('mal/:username')
  async getMalProfile(@Param('username') userName: string): Promise<MalUser> {
    const user = this.userService.findOneMalUser(userName);

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
