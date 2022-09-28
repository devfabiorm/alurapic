import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { KeycloakAuthGuard } from 'src/auth/keycloak-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from './user.entity';
import { MalUser, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post()
  create(@Body() user: User): User {
    const createdUser = this.userService.create(user);

    return createdUser;
  }

  @Get(':username')
  //@UseGuards(JwtAuthGuard)
  //@UseGuards(KeycloakAuthGuard)
  getProfile(@Param('username') username: string): User {
    const user = this.userService.findOne(username);

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
