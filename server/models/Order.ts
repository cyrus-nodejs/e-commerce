import mongoose from "mongoose";
const Schema = mongoose.Schema;




const OrderSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    cartid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cart'
    },
    items:{
        type: Array,
         ref: 'Item' 
    },
    giftwrapper:{
        type:Number,
        default:0,

    },
    deliveryfee:{
        type:Number,
        default:0,
    },
    bill: {
        type: Number,
        required: true
    },
    paymentid: {
        type: String,
    },
    
    payment:{
        type: Boolean ,
        default:false,
        
    },
    address:{
        type: String,
        required: true
        
    },
    deliveredAt: {
         type: Date 
        },
    delivery:{
        type: String ,
        enum: ['pending', 'shipped', 'delivered', 'canceled'],
        default :'pending',
    },
    isDelivered:{
        type: Boolean ,
        default:false,
    }
},  {
    timestamps: true // Adds createdAt and updatedAt fields automatically
  })
export const Order : any = mongoose.model("Order", OrderSchema)


