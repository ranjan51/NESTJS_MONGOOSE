import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ERROR_MESSAGES } from 'src/shared/appMessages.schema';
import { createResponse } from 'src/shared/appresponse.shared';

@Injectable()
export class UserDao {
    constructor(@InjectModel('UserAccount') private readonly UserAccount: Model<any>) {}

    async createUser(userData: any) {
        try {
            const createdUser = await this.UserAccount.create(userData);
            return createdUser;
        } catch (error) {
            return createResponse(HttpStatus.EXPECTATION_FAILED, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
            ;
        }
    }

    async findUserByUsername(username: string) {
        try {
            const user = await this.UserAccount.findOne({ uname: username });
            return user;
        } catch (error) {
            return createResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);
        }
    }


//CHECK IF USER EXIST
    async findUserById(user_id: any) {
        try {
            const user = await this.UserAccount.findOne({ _id: user_id });
            return user;
        } catch (error) {
            return createResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

        }
    }

//pagination and get with name
    async getAllUsers(page: number, limit: number, name: string) {
        try {
            let query = this.UserAccount.find({});
    
            if (name) {
                query = query.regex('name', new RegExp(name, 'i'));
            }
    
            const users = await query
                .skip((page - 1) * limit)
                .limit(limit);
            return users;
        } catch (error) {
            return createResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);
        }
    }
    


    async deleteuserDao(id: any) {
        try {
            const deletedUser = await this.UserAccount.findByIdAndDelete(id).exec();
            return deletedUser;
        } catch (error) {
            return createResponse(HttpStatus.FORBIDDEN, ERROR_MESSAGES.BAD_REQUEST);
        }
    }
}