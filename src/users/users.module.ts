import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { LoggingAxiosInterceptor } from './logging.axios-interceptor';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    HttpModule.register({
      baseURL: 'https://api.jikan.moe/v4',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, LoggingAxiosInterceptor],
  exports: [UsersService],
})
export class UsersModule {}
