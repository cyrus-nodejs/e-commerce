import mongoose from "mongoose"
const Schema = mongoose.Schema;



const ReviewsSchema = new Schema({
    owner : {
        type: String,
         required: true,
         ref: 'User'
       },
    title: {
        type:String,
     },
    message:{
        type:String,
     },
     rating:{
        type:Number,
        default:0
    
    },
        date_added:{
            type:Date,
            default:Date.now
        },
    
     
  });

  export const Reviews:any = mongoose.model("Category", ReviewsSchema);