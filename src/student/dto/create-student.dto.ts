import { IsString, IsNumber, IsIn } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsNumber()
  regno: number;

  @IsString()
  @IsIn(['Male', 'Female', 'Other'])
  gender: string;

  @IsNumber()
  grade: number;
}
