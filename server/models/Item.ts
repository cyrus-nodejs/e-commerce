import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema =  new Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  

const ItemSchema = new Schema({
    title:{
       type:String,
       required:true,
       unique:true,
    },
    
    description:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
 
     numReviews: { type: Number, default: 0 },
     reviews: [reviewSchema],
    discount:{
        type:Number,
        default:0
    },
    unit: {
        type:Number,
          default:1,
        } ,
         
 quantity: {
    type:Number,
} ,
    image:{
        type:String,
        required:true,
        unique:true,
    },
   
 
    trending:{
        type:Boolean,
        required:true,
        default:false
       
    },
     recommended:{
         type:Boolean,
         required:true,
         default:false
        
     },
    topfeatured:{
        type:Boolean,
        required:true,
        default:false

    },

    topdeals:{
        type:Boolean,
        default:false
    },

    date_added:{
        type:Date,
        default:Date.now
    },
})

ItemSchema.index({ category: 1 });
export const Item:any = mongoose.model("Item", ItemSchema);




