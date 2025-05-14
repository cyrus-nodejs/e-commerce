import mongoose from "mongoose"
const Schema = mongoose.Schema;



const ReviewsSchema = new Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
       },
   
    comment:{
        type:String,
     },
     rating:{
        type:Number,
        min: 1,
        max: 5,
        required: true,
    
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
    
     
  });

  // Optional: prevent duplicate reviews from the same user for an item
ReviewsSchema.index({ item: 1, owner: 1 }, { unique: true });
  export const Reviews:any = mongoose.model("Category", ReviewsSchema);