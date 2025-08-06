import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUservalDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  registerNo: string;
}
