import { Module } from '@nestjs/common';
import { AppController } from './App.Controller';
import { AppService } from './App.Service';
import { UsersModule } from '../users/Users.Module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/Auth.Module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [ 
    UsersModule,
    AuthModule,
  
      MongooseModule.forRootAsync({
        useFactory: async () => {
          try {
            return {
              uri: process.env.MONGODB_URI,
            };
          } catch (error) {
            console.error(' connection error:', error);
            throw error;
          }
        },
      }),      
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
