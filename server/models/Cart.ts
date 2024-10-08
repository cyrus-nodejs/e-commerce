const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    owner : {
        type: String,
         required: true,
         ref: 'User'
       },
      items: [{
        itemId: {
         type: mongoose.ObjectId ,
         ref: 'Item',
         required: true,
         unique:true,
      },
      title: String,
      image:{
        type:String,
        ref:"Item",
        required:true,
    },
   
      quantity: {
         type: Number,
         required: true,
         min: 1,
         default: 1},
         price: Number
       }],
      bill: {
          type: Number,
          required: true,
         default: 0
        }
      }, {
      timestamps: true
});


export const Cart: any = mongoose.model("Cart", CartSchema);
