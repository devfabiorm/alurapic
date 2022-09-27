import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: number;

  @IsNotEmpty({
    message: 'username is required',
  })
  @IsString({
    message: 'username cannot contain special character or number',
  })
  username: string;

  @IsEmail(
    {},
    {
      message: 'email must be in correct format',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'password is required',
  })
  password: string;

  @IsNotEmpty({
    message: 'fullName is required',
  })
  fullName: string;

  createdAt: Date;
}
