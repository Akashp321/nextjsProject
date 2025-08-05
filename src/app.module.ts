import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MailModule } from './mail/mail.module';
import { TaskModule } from './tasks/tasks.module';
import { QueryModule } from './queue/queue.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-multer'),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis:{
        host:'localhost',
        port:3000,
      }
    }),
    ProductsModule,MailModule,TaskModule,QueryModule
  ],
})
export class AppModule {
   configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  }
}
