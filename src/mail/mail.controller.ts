import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body('to') to: string) {
    if (!to) {
      return { message: 'Recipient email is required' };
    }
    try {
      const info = await this.mailService.sendMail(to);
      return { message: 'Email sent', info };
    } catch (error) {
      return { message: 'Error sending email', error: error.message };
    }
  }
}
