import { AuthController } from './Auth.Controller';
import { AuthService } from './Auth.Service';
import { MongooseModule } from '@nestjs/mongoose';
import { loginschema } from 'src/database/schema/LoginSchema';
import { authDao } from 'src/database/dao/AuthDao';
import { userSchema } from 'src/database/schema/UserSchema';
import { UserDao } from 'src/database/dao/User.Dao';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtSharedModule } from '../../utils/Jwt.Module';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'loginsession', schema: loginschema }]), 
        MongooseModule.forFeature([{ name: 'UserAccount', schema: userSchema }]),
          JwtSharedModule,
    ],
      controllers: [AuthController],
      providers: [AuthService,authDao,UserDao], 
      exports: [AuthService,authDao,UserDao], 
})

export class AuthModule {}