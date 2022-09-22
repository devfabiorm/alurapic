import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      email: '',
      fullName: '',
      createdAt: new Date(),
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      email: '',
      fullName: '',
      createdAt: new Date(),
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user: User) => user.username === username);
  }

  create(user: User): User {
    this.users.push(user);

    return user;
  }
}
