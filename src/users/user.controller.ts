import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<Partial<UserDocument>[]> {
    const users = await this.userService.findAll();
    return users.map(({ password, ...rest }) => rest);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Partial<UserDocument>> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...rest } = user.toObject();
    return rest;
  }
}
