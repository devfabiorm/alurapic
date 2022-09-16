import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  create(user) {
    this.users.push(user);

    return user;
  }
}
