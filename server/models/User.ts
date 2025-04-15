
// importing modules
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';



  

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


 



 

 
