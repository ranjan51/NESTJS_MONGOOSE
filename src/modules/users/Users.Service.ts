import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { UserDao } from 'src/database/dao/User.Dao';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, WARN_MESSAGES } from 'src/shared/appMessages.schema';
import { createResponse } from 'src/shared/appresponse.shared';

@Injectable()
export class UsersService {
    constructor(
        private readonly userDao: UserDao,
        ) {}

//REGISTER THE USER
    public async createUserSvc(user: any) {
        const { name, emp_id, uname, comm_email, dept, pwd, roles } = user;
       
        if (!name || !emp_id || !uname || !comm_email || !dept || !pwd || !roles) {
            return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.BAD_REQUEST);
        }

//VALIDATE USERNAME
         const unameemailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!unameemailPattern.test(uname)) {
             return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.INVALID_USERNAME);
         }
// VALIDATION FOR PASSWORD
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
        if (!passwordRegex.test(pwd)) {
            return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.INVALID_PWD);
        }
        const hashedPwd = await bcrypt.hash(pwd, 10);

// VALIDATION FOR EMP_ID.
        const empIdPattern = /^[A-Za-z0-9]{14}$/;
        if (!empIdPattern.test(emp_id)) {
            return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.INVALID_EMPID);
        }

// VALIDATION FOR EMAIL.
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(comm_email)) {
            return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.INVALID_EMAIL);
        }

        // VALIDATION FOR ROLES.
        if (roles != "Admin" && roles != "User") {
            return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.INVALID_ROLE_NAME);
        }

        const newData = {
            name,
            emp_id,
            uname,
            dept,
            pwd: hashedPwd,
            comm_email,
            roles: [{
                rID: new mongoose.Types.ObjectId(),
                rName: roles,
                start_ts: new Date().getTime(),
                end_ts: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
            }],
            active: false, 
            
        };
            

        const existingUser = await this.userDao.findUserByUsername(uname);
        if (existingUser) {
            return createResponse(HttpStatus.CONFLICT, WARN_MESSAGES.CONFLICT);
        } else {
            await this.userDao.createUser(newData);
            return createResponse(HttpStatus.OK, 'created successfully');
        }
               
    }

//  GET THE ALL USERS
public async getUsersSvc(page: number, limit: number, name: string) {
    try {
        const users = await this.userDao.getAllUsers(page, limit, name);
        return users;
    } catch (error) {
        return createResponse(HttpStatus.OK, SUCCESS_MESSAGES.DELIVERED);
    }
  }
  
// DELETE THE ALL USERS
public async deleteUserSvc(id: any) {
    try {
        await this.userDao.deleteuserDao(id);
        return createResponse(HttpStatus.OK, SUCCESS_MESSAGES.DELETED);
    } catch (error) {
        return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error);
    }
}

//UPDATE THE USER
    public async updateUserSvc(user_id: string, updates: any) {
        const { name, emp_id, uname, comm_email, dept, pwd, roles } = updates;
    
        // Validate user_id
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.NOT_FOUND);
        }
//CHECK IF USERS EXIST
        const existingUser = await this.userDao.findUserById(user_id);
        if (!existingUser) {
            return createResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);
        }
// UPDATE THE EXISTING USERS
        if (name) existingUser.name = name;
        if (emp_id) existingUser.emp_id = emp_id;
        if (uname) existingUser.uname = uname;
        if (comm_email) existingUser.comm_email = comm_email;
        if (dept) existingUser.dept = dept;
        if (pwd) {
            const hashedPwd = await bcrypt.hash(pwd, 10);
            existingUser.pwd = hashedPwd;
        }
        if (roles) {
// CHECK AND VALIDATE THE ROLES
            if (roles !== "Admin" && roles !== "User") {
                return createResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.INVALID_ROLE_NAME);
            }

        // UPDATE THE ROLES
            existingUser.roles = [{
                rID: new mongoose.Types.ObjectId(),
                rName: roles,
                start_ts: new Date().getTime(),
                end_ts: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
            }];
        }
        // Save the updated user
        await existingUser.save();
    
        return createResponse(HttpStatus.OK, 'User updated successfully');
    }
    



}


  
  

