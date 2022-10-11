import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUserAlreadyExist } from './is-user-already-exists.validator';

export class User {
  id: number;

  @IsUserAlreadyExist({
    message: 'username already exists',
  })
  @IsNotEmpty({
    message: 'username is required',
  })
  @IsString({
    message: 'username cannot contain special character or number',
  })
  @Expose({
    name: 'nickname',
  })
  username: string;

  @IsEmail(
    {},
    {
      message: 'email must be in correct format',
    },
  )
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
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
