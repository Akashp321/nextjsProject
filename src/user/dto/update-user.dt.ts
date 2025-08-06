import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class UserRegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be 6' })
  password: string;
}