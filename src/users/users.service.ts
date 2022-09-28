import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

export interface MalUser {
  username: string;
  url: string;
  mal_id: BigInteger;
}

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

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

  public async findOneMalUser(username: string): Promise<MalUser> {
    //console.log(await this.httpService.axiosRef.get(`/${username}/full`));
    const user = await this.httpService.axiosRef.get(`users/${username}/full`);
    return user.data;
  }
}
