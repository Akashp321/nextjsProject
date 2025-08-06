import { Injectable } from '@nestjs/common';
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
  async register(cdto: CreateUservalDto): Promise<string> {
    const { email, registerNo } = cdto;
    const existing = await this.uservalModel.findOne({
      $or: [{ email }, { registerNo }],
    });
    if (existing) {
      throw new Error('User already exist');
    }
    const userval = new this.uservalModel(cdto);
    await userval.save();
    return 'new user registerd';
  }
  async getAllUserval() {
    return this.uservalModel.find().exec();
  }
}
