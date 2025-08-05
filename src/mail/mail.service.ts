import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import path from 'path';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'akashperumalait@gmail.com',          
        pass: 'rezu imym oczf jmah', 
      },
    });
  }

  async sendMail(to: string) {
    if (!to) {
      throw new Error('Recipient email  required');
    }

    const mailOptions = {
  from: 'akashperumalait@gmail.com',
  to: 'akashperumalait@gmail.com',
  subject: 'Work completed with attachment',
  text: 'See attached file.',
  attachments: [
    {
      filename: 'test.pdf',
      path: path.join(__dirname, '../assets/test.pdf'),
    },
  ],
};

    return await this.transporter.sendMail(mailOptions);
  }
}
