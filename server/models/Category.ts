import mongoose from "mongoose"
const Schema = mongoose.Schema;



const CategorySchema = new Schema({
    title: {
        type:String,
     },
    image:{
        type:String,
     },
     item:[{
         type: mongoose.Schema.Types.ObjectId,
          default: [],
          ref: 'Item' 
        }],
    
     
  });

  export const Category:any = mongoose.model("Category", CategorySchema);