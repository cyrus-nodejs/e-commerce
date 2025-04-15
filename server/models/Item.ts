import mongoose from 'mongoose';

const Schema = mongoose.Schema;



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

     reviews:[{
              type: mongoose.Schema.Types.ObjectId,
               default: [],
               ref: 'Reviews' 
             }],

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
    default:50
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

export const Item:any = mongoose.model("Item", ItemSchema);




