import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UservalService } from './userval.service';
import { Userval, UservalSchema } from './userval.schema';
import { UservalController } from './userval.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Userval.name, schema: UservalSchema }]),
  ],
  controllers: [UservalController],
  providers: [UservalService],
  exports: [UservalService],
})
export class UservalModule {}
