import { Module } from '@nestjs/common';
import { UsersController } from './Users.Controller';
import { UsersService } from './Users.Service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../../database/schema/UserSchema'; 
import { UserDao } from 'src/database/dao/User.Dao';
import { JwtModule } from '@nestjs/jwt';
import { JwtSharedModule } from '../../utils/Jwt.Module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserAccount', schema: userSchema }]),
    JwtSharedModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserDao],
  exports: [UsersService, UserDao], 
})
export class UsersModule {}
   