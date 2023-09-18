import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ERROR_MESSAGES } from "src/shared/appMessages.schema";
import { createResponse } from "src/shared/appresponse.shared";


@Injectable()

export class authDao{
    constructor(@InjectModel('loginsession') private readonly loginsession: Model<any>) {}
//getting the users who are logged in 
    async getlogusers() {
        try {
        const loguser = await this.loginsession.find()
        return loguser;
        } catch (error) {
            return createResponse(HttpStatus.EXPECTATION_FAILED, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }

    }
//CREATING LOGIN SESSION
    async loginuserDao(loginInfo: any) {
        try {
      const loginuser = await this.loginsession.create(loginInfo)
      return loginuser;
        }catch (error) {
            return createResponse(HttpStatus.EXPECTATION_FAILED, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
            ;
        }

    }


//CHECK IF USERS ARE ALREADY LOGGED IN
    async findLoggedIndao(uid:any) {
        try{
        const finduname = await this.loginsession.findOne({uid})
        return finduname;
        }
        catch (error) {
            return createResponse(HttpStatus.EXPECTATION_FAILED, ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }
// LOGOUT THE USERS AND UPDATE THE END TIME
    async findUserByIdDao(id:any) {
        try{
        const findUserById = await this.loginsession.findOne({_id:id});
        return findUserById;
        }catch (error) {
            return createResponse(HttpStatus.EXPECTATION_FAILED, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
            ;
        }
    }
}