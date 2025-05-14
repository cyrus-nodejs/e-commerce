import mongoose from "mongoose"


const Schema = mongoose.Schema;

const ViewSchema = new Schema({

    owner : {
        type: String,
         required: true,
         ref: 'User'
       },
       items :[{
        image:{
          type:String,
          required:true,
          unique:true,
      },
        title:String,
        unit:{
            type:Number,
            required:true,
            min:1,
            default:1,
        },
        price:Number,
    }],
  });


  export const View:any = mongoose.model("View", ViewSchema);