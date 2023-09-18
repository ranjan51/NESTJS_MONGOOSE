import {HttpStatus, Injectable } from '@nestjs/common';
import { authDao } from 'src/database/dao/AuthDao';
import { UserDao } from 'src/database/dao/User.Dao';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, WARN_MESSAGES } from 'src/shared/appMessages.schema';
import { createResponse } from 'src/shared/appresponse.shared';
import {compare} from "bcrypt";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly authDao: authDao,
        private readonly userDao: UserDao,
        private readonly jwtService: JwtService
        ) {}
    
        public async getUsers() {
          try {
              const newUsers = await this.authDao.getlogusers();
              return newUsers;
          } catch (error) {
              return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
          }
      }


    public async loginUser(user:any) {
        const { uname, pwd } = user;
// IF THERE IS NO UNAME AND PWD
        if (!uname || !pwd) {
            return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.BAD_REQUEST); 
                 }
 
      
                 const foundUser = await this.userDao.findUserByUsername(uname);

                 
                 if (!foundUser) {
                    return createResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.INVALID_USERNAME); 
                  }
                
                  const isPasswordValid = await compare(pwd, foundUser.pwd);

                  if (!isPasswordValid) {
                    return createResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.INVALID_PWD); 
                  }


                    // CCHECK IF USER ALREADY LOGGED IN
                 const existingLoginInfo = await this.authDao.findLoggedIndao(foundUser.uID);

                  if (existingLoginInfo) {
                          return createResponse(HttpStatus.NOT_ACCEPTABLE, WARN_MESSAGES.ALREADY_LOGGED_IN); 
                          //USER ALREADY_LOGGED_IN
                    }


                    const loginInfo = {
                        uid: foundUser.uID,
                        rid: foundUser.roles[0].rID,
                        rname: foundUser.roles[0].rName,
                        start_ts: Date.now(),
                        end_ts: Date.now() + 20 * 60 * 1000, 
                      };


        //PASSING PAYLOAD TO JWTSERVICE
                      const payload = { 
                        sub:foundUser._id,
                        name: foundUser.name,
                        userName: foundUser.uname,
                        userRole: foundUser.roles[0].rName
                      };
                      const token = this.jwtService.sign(payload);
                   
                    
            await this.authDao.loginuserDao(loginInfo)
       
         return { message: SUCCESS_MESSAGES.LOGIN,access_token: token };
    
    }


//LOGOUT UPDATING THE END TIME
  public async logoutUserSvc(userId: string) {
  const currentUser = await this.authDao.findUserByIdDao(userId);

  if (currentUser) {
    const currentTimestamp = Date.now();

    // Updating the end_ts
    currentUser.end_ts = currentTimestamp;

    await currentUser.save();

    return { message: 'Logged out successfully' };
  } else {
    throw new Error('User not found');
  }
}

  
}





