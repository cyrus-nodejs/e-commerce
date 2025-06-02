// models/Cart.ts or models/Cart.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    owner : {
        type:  mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
       },
       items :[{
        itemId : {
            type:String,
            required:true,
            unique:true,
        },
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
      bill: {
          type: Number,
          required: true,
         default: 0
        },

      }, {
      timestamps: true
});


export const Cart: any = mongoose.model("Cart", CartSchema);

