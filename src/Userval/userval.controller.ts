import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUservalDto } from './create-userval.dto';
import { UservalService } from './userval.service';

@Controller('userval')
export class UservalController {
  constructor(private readonly service: UservalService) {}

  @Post('register')
  async register(@Body() cdto: CreateUservalDto) {
    return this.service.register(cdto);
  }

  @Get()
  async getAll() {
    return this.service.getAllUserval();
  }
}
