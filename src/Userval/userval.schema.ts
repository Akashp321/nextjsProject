import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UservalDocument = Userval & Document;

@Schema()
export class Userval {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  registerNo: string;
}

export const UservalSchema = SchemaFactory.createForClass(Userval);
