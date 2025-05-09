
// importing modules

import mongoose, { Document, Schema } from 'mongoose';
// const Schema = mongoose.Schema
import passportLocalMongoose from 'passport-local-mongoose';


// // Define the User interface that represents the structure of the document
// export interface User extends Document {
//   id: string;   // This will be the ObjectId in MongoDB
//   name: string;
//   email: string;
//   username:string;
//   firstname:string;
//   lastname:string;
//   role:string;
//   token:string; 
//   register_date:any
//   // add any other properties you want in the User model
// }

  

const UserSchema = new Schema({
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
  
         role:{
          type:String,
          enum: [ 'customer', 'reseller','customer service', 'admin', 'super admin'],
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


 export const User:any = mongoose.model("User", UserSchema);


 



 

 
