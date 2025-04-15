import mongoose from "mongoose"


const Schema = mongoose.Schema;

const ViewSchema = new Schema({

    owner : {
        type: String,
         required: true,
         ref: 'User'
       },
       items:{ 
         type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Item' 
    },
  });


  export const View:any = mongoose.model("View", ViewSchema);