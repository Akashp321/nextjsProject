import { IsEmail,IsString,IsOptional } from "class-validator";
export class CreateUserDto{
    @IsOptional()
    @IsString()
    name?:string;
     @IsOptional()
    @IsEmail()
    email?:string;
    @IsString()
    @IsOptional()
    password?:string;
}