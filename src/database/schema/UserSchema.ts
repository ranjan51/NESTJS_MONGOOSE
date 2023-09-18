import { Schema, SchemaTypes, model } from 'mongoose'
import * as mongoose from 'mongoose';


enum Roles {
    role1 = "Admin",
    role2 = "User"
}

const roleSchema = new Schema({
    rID: {
        type: SchemaTypes.String, 
        required: true,
        unique: true, 
    },
    rName: {
        type: SchemaTypes.String,
        required: true,
        enum: Roles
    },
    start_ts: {
        type: SchemaTypes.Date,
        default: Date.now(),
    },
    end_ts: {
        type: SchemaTypes.Date,
        required: true,
    }
});



export const userSchema = new Schema({
    uID: {
        type: SchemaTypes.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true
    },    
    name: {
        type: SchemaTypes.String,
        required: true
    },
    emp_id: {
        type: SchemaTypes.String,
        required: true,
      },
    dept: {
        type: SchemaTypes.String,
        required: true
    },
    uname: {
        type: SchemaTypes.String,
        required: true,
        unique: true, 
      },
    pwd: {
        type: SchemaTypes.String,
        required: true,
    },
    comm_email: {
        type: SchemaTypes.String,
        required: true,
        validate: {
            validator: (value:any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Communication email must be a valid email address.'
        }
    },
    roles: [roleSchema],
    active: {
        type:SchemaTypes.Boolean,
        default:false,
      },
},{timestamps: true})



