import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async create(studentData: CreateStudentDto): Promise<Student> {
    return this.studentModel.create(studentData);
  }

  async update(id: string, updateData: UpdateStudentDto): Promise<Student> {
    const updated = await this.studentModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }

  async patch(id: string, updateData: UpdateStudentDto): Promise<Student> {
    return this.update(id, updateData);
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.studentModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Student not found');
    return { message: 'Student deleted successfully' };
  }
}
