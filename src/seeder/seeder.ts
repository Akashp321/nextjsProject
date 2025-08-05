import { NestFactory } from "@nestjs/core";
import { User,UserDocument } from "src/users/user.schema";
import { AppModule } from "src/app.module";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
async function bootstrap(){
    const app=await NestFactory.createApplicationContext(AppModule);
    const userModel=app.get<Model<UserDocument>>(getModelToken(User.name));
    const admin=await userModel.findOne({username:'admin'});
    if(!admin){
        await userModel.create({
            username: 'admin',
      email: 'admin@example.com',
      password: 'admin123', 
      role: 'admin',
      fullName: 'Admin User',
      isActive: true,
        })
        console.log("new user creater");
    }
    else{
        console.log("already exist");
    }
    await app.close();
   
}
bootstrap();    