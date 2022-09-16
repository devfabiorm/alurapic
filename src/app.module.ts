import { Module } from '@nestjs/common';

import { UsersController } from './user/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
