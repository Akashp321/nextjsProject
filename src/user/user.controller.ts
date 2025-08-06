import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/update-user.dt';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() dto: UserRegisterDto) {
    return this.userService.register(dto);
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }
}
