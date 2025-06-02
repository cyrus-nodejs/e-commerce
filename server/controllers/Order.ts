
import 'dotenv/config'
import Stripe from "stripe";
import {Order} from "../models/Order"
import {Cart} from "../models/Cart"
import { Address } from '../models/Address';
import { Request, Response} from "express";
import { IUser } from '../models/User';
const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2024-06-20",
    appInfo: {
      name: "emall",
      url: "emall",
      version: "0.0.2",
    },
    typescript: true,
  });


  //Retrieve current Order
  export const getCurrentOrder = async (req:Request, res:Response ) => {
     const user = req.user as IUser
     const owner = user._id
    
    const cart = await Cart.findOne({owner})
    const cartId = cart?._id
  
 try{
            
const order = await Order.findOne({cartid:cartId}).sort({ createdAt: -1 }).exec();
 
            
if(order ){
         
return res.json({ success: true, message: "View current order!", order:order });
            
}else{
          
return    res.json({ success: false, message: "No orders yet!" });

}
}catch(err){
  
  console.log(err);
return   res.status(500).send("Something went wrong");
  }
      }

   



//Rerieve all orders
export const getAllOrder = async (req:Request, res:Response ) => {
    const user = req.user as { _id: string }
 const userId = user._id 

try{
        
const order = await Order.find({owner:userId}).sort({ createdAt: -1 }).exec();
        
if(order ){

       return   res.json({ success: true, message: "View all orders!", order:order });

}else{
      
  return   res.json({ success: false, message: "No orders yet!" });
  
}
}catch(err){
       

return    res.status(500).send("Something went wrong");
   
  }}
    

    //Retrieve order details
export const getOrderById = async (req:Request, res:Response ) => {
    const id = req.params.id
    console.log(id)
try{

        const order = await Order.findById(id).populate('owner', 'firstname email');
       if(order ){

      return   res.json({ success: true, message: "View order!", order:order});
      
    }else{
    
      return  res.json({ success: false, message: "error!" });
       
    }
}catch(err){
      
  console.log(err);
   return   res.status(500).send("Something went wrong");
  }
  
   }
 


   
// Create Payment intent with Stripes
export const createPayment = async (req:Request, res: any) => {
   const user = req.user as IUser
 const owner= user._id
 
  
    const {gift, shipping, cartBills} = req.body
    const cart = await Cart.findOne({owner})
    
    const shippingAddress = await Address.findOne({owner})
    const address = shippingAddress.address
    const nation = shippingAddress.nation
    
try{

  const bill = gift + shipping + cartBills

 const  paymentIntent = await stripe.paymentIntents.create({
        amount: bill * 100,
        currency: "usd",
        receipt_email: user.email,
      });
    
    if (paymentIntent){

      //Check if order already exist
        const OrderExists = await Order.findOne({paymentid:paymentIntent.id})
        if (OrderExists){

         res.json({success:true, message:"Cannot proceed! Order Exists"})
        
        }
        else{
        const order = await Order.create({
                owner,
                cartid:cart._id,
                items: cart.items,
                bill: bill,
                address:`${address}, ${nation}`,
                giftwrapper:gift,
                deliveryfee:shipping,
                paymentid:paymentIntent.id
        });

        console.log(paymentIntent.client_secret)
      
        return  res.json({success:true, message:"Payment intent created!", clientSecret: paymentIntent.client_secret})
       }  
    }else{

      return  res.json({success:false, message:"cannot create payment intent!!"})
   
    }

}catch (err){

console.log(err)
return res.json({success:false, message:"Something went wrong"})

}
}

//Validate payment
export const confirmPayment = async (req:Request, res:Response ) => {
   const user = req.user as { _id: string }
 const owner = user._id
  
  const paymentId =  req.params.paymentIntent
  const order = await Order.findOne({paymentid:paymentId})

try{
if (order){
  
const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
  
if (paymentIntent.status == 'succeeded'){

const filter = {paymentid:paymentId }
const update = {payment:true, deliveredAt:Date.now()}
 await Order.findOneAndUpdate(filter, update, {new:true, upsert:true,  includeResultMetadata: true})
await Cart.findOneAndDelete({owner})

return   res.json({success:true, message:"Payment verification Success!"})

}else{
     
  return   res.json({success:false, message:" Payment verification failed!"})
    
}
}else{
  
  return  res.json({sucess:false, message:"No Order exist"})
}
}catch (err){

console.log(err)
return res.json({success:false, message:"Something went wrong"})

}

}

//Recover payment 
export const retrievePayment = async (req:Request, res:Response ) => {
    
const {orderId} = req.body

try{
    const order = await Order.findOne({_id:orderId})
    const paymentId = order.paymentid
    
if (order){

 const   paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    if (!paymentIntent) throw Error('payment failed!');
    
    if (paymentIntent){
      
      return  res.json({success:true, message:`Transaction status:${paymentIntent.status}, Amount Paid:$${paymentIntent.amount}`})
   
    }
}else{
 
  return  res.json({sucess:false, message:"Order not found"})

}
}catch (err){

  console.log(err)

  return res.json({success:false, message:"Something went wrong"})
}
}