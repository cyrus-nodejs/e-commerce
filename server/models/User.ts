
// importing modules

import mongoose, { Document, Schema } from 'mongoose';
// const Schema = mongoose.Schema
 import passportLocalMongoose from 'passport-local-mongoose';

// 1. Define the interface for your User document
export interface IUser extends Document {
  _id:string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  googleId: string;
  displayName: string;
  photo: string;
  role: 'customer' | 'reseller' | 'customer service' | 'admin' | 'super admin';
  token: string;
  register_date: Date;
   hash?: string;
  salt?: string;
  setPassword: (password: string, cb: (err: any) => void) => void;
  authenticate: (
    password: string,
    cb: (err: any, user?: IUser, error?: any) => void
  ) => void;


}
  
// passport-local-mongoose extends Document and adds extra methods

const UserSchema = new Schema<IUser>({
    email:{
        type:String,
       required:[true, "Please enter an email"],
        unique:true,
       lowercase:true,
    
    },  
     
    username:{
              type:String,
               unique:true,
            },
    firstname:{
          type:String,
    },
    lastname:{
            type:String,
       },
       googleId: { type: String, unique: true, sparse: true }, // Google OAuth id
  displayName: String,
  photo: String,
  
    role:{
          type:String,
          enum: [ 'customer', 'reseller', 'customer service', 'admin', 'super admin'],
          default:'customer'
      },
    token:{
          type:String,
          unique:true,
  },

      register_date:{
      type:Date,
        default: Date.now
      },

        
        
})






UserSchema.plugin(passportLocalMongoose);


// Final export with correct types
export const User = mongoose.model<IUser>('User', UserSchema);



 

 
