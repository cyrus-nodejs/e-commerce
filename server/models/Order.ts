import mongoose from "mongoose";
const Schema = mongoose.Schema;




const OrderSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

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
    delivery:{
        type: String ,
        enum: ['pending', 'shipped', 'delivered', 'canceled'],
        default :'pending',
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})
export const Order : any = mongoose.model("Order", OrderSchema)


