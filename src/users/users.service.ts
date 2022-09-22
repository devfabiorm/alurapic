import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      email: 'carterjohn@test.com',
      fullName: 'John Carter',
      createdAt: new Date(),
    },
    {
      id: 2,
      username: 'mary',
      password: 'guesswhichone',
      email: 'maryangel@test.com',
      fullName: 'Maria Angelina',
      createdAt: new Date(),
    },
  ];

  public findOne(username: string): User {
    return this.users.find((user: User) => user.username === username);
  }

  public create(user: User): User {
    this.users.push(user);

    return user;
  }
}
