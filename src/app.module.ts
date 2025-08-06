import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { UserModule } from './user/user.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/opps_api'),
   
    UserModule
  ],
})
export class AppModule {
  //  configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*'); 
  // }
}
