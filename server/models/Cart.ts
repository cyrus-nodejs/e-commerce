import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    owner : {
        type:  mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
       },
       items:[{
        type: Array,
         ref: 'Item' 
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
