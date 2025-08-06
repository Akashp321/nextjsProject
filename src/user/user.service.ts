import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { UserRegisterDto } from './dto/update-user.dt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async register(dto: UserRegisterDto): Promise<IUser> {
    try {
      const exists = await this.userModel.findOne({ email: dto.email });
      if (exists) {
        throw new ConflictException('Email already exists');
      }

      const user = new this.userModel(dto);
      return await user.save();
    } catch (err) {
      console.error('Error registering user:', err);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find();
  }
}
