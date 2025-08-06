import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Userval, UservalDocument } from './userval.schema';
import { CreateUservalDto } from './create-userval.dto';

@Injectable()
export class UservalService {
  constructor(
    @InjectModel(Userval.name)
    private readonly uservalModel: Model<UservalDocument>,
  ) {}

  async register(cdto: CreateUservalDto): Promise<{ message: string }> {
    const { email, registerNo } = cdto;

    const existing = await this.uservalModel.findOne({
      $or: [{ email }, { registerNo }],
    });

    if (existing) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    try {
      const userval = new this.uservalModel(cdto);
      await userval.save();
      return { message: 'New user registered' };
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          'Duplicate email or register number',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUserval() {
    return this.uservalModel.find().exec();
  }
}
