import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ViewSchema = new Schema({

    owner : {
        type: String,
         required: true,
         ref: 'User'
       },
       items:{
        type: Array,
         ref: 'Item' 
    },
  });

const CategorySchema = new Schema({
    category: {
        type:String,
     },
    avatar:{
        type:String,
     },
     item:[{
         type: Array,
          ref: 'Item' 
        }],
    
     
  });

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

    newprice:{
        type:Number,
        required:true,
    },
   
   
    status:{
        type:String,
    
    },
    review:{
        type:Number,
        
    },
    rating:{
        type:Number,
    
    },
    discount:{
        type:Number,
    },
    unit: {
        type:Number,
          default:1,
        } ,
         
 quantity: {
    type:Number,
    default:1
} ,
    image:{
        type:String,
        required:true,
        unique:true,
    },
   
 
    trending:{
        type:Boolean,
        required:true,
       
    },
     recommended:{
         type:Boolean,
         required:true,
        
     },
    topfeatured:{
        type:Boolean,
        required:true,

    },

    topdeals:{
        type:Boolean,
    },

    date_added:{
        type:Date,
        default:Date.now
    },
})

export const Item:any = mongoose.model("Item", ItemSchema);
export const Category:any = mongoose.model("Category", CategorySchema);
export const View:any = mongoose.model("View", ViewSchema);


