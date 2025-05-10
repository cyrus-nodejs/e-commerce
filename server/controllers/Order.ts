
import 'dotenv/config'
import Stripe from "stripe";
import {Order} from "../models/Order"
import {Cart} from "../models/Cart"

import { Request, Response} from "express";
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
  export const getCurrentOrder = async (req:any, res:any ) => {
    const owner  = req.user?.id
    let cart = await Cart.findOne({owner})
    let cartId = cart?._id
        try{
            const order = await Order.findOne({cartid:cartId})
            if(order ){
              res.json({ success: true, message: "View current order!", order:order });
            }
            else{
              res.json({ success: false, message: "No orders yet!" });
            }
        }
        catch(err){
            console.log(err);
            res.status(500).send("Something went wrong");
        }
      }

   



//Rerieve all orders
export const getAllOrder = async (req:any, res:any ) => {
    const owner = req.user?.id
   
        try{
        const order = await Order.find({owner:owner}).sort({ _id: -1 })
        if(order ){
            console.log(order)
          res.json({ success: true, message: "View all orders!", order:order });
        }
        else{
          res.json({ success: false, message: "No orders yet!" });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }}
    

    //Retrieve order details
export const orderDetails = async (req:any, res:any ) => {
    const id = req.params.id
   try{
       const order = await Order.findOne({_id:id})
       console.log(order)
       if(order ){
         res.json({ success: true, message: "View order!", order:order});
       }
       else{
         res.json({ success: false, message: "error!" });
       }
   }
   catch(err){
       console.log(err);
       res.status(500).send("Something went wrong");
   }
  
   }
 

       //Post Stripe Publishable Key
export const config = async (req:any, res:any ) => {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY
    if(publishableKey) {
        console.log(publishableKey)
        res.json({success:true, message:"Pkey sent!", publishableKey: publishableKey ,
        });
    }else{
        res.json({success:false, message:"No Pkey!"})
    }
    
   
   
    }

    // //Create new Order
    // export const createOrder = async (req:any, res:any ) => {
       
    //     const owner  = req.user?._id
    //     const {gift, shipping, clientSecret} = req.body
    //     console.log(gift, shipping)
    //    try{
    //     let cart = await Cart.findOne({owner})
    //     if (cart){
    //         const order = await Order.create({
    //             owner,
    //             items: cart.items,
    //             bill: cart.bill + shipping + gift,
    //             giftwrapper:gift,
    //             deliveryfee:shipping,
    //             paymentid:clientSecret,
    //         });
     
    //       return  res.status(200).json({success:true, message:"New order created!", order:order})
    //     }else{
    //       return  res.json({success:false, message:"order added!", })
    //     }
    //    }catch (err){
    //     console.log(err)
    //    }
       
    //     }


   
// Create Payment intent with Stripes
export const createPayment = async (req:any, res: any) => {
    const owner  = req.user?.id
    console.log(req.body)
    const {gift, shipping,  cartBills} = req.body
try{
     const bill = gift + shipping + cartBills
console.log(bill)
if (owner){
 let   paymentIntent = await stripe.paymentIntents.create({
        amount: bill * 100,
        currency: "usd",
      });
    if (!paymentIntent) throw Error('payment failed!');
    if (paymentIntent){
        const OrderExists = await Order.findOne({paymentid:paymentIntent.id})
        let cart = await Cart.findOne({owner})
        if (OrderExists){
         res.json({success:true, message:"Order Exists"})
        }else{
        const order = await Order.create({
                owner,
                cartid:cart._id,
                items: cart.items,
                bill: bill,
                giftwrapper:gift,
                deliveryfee:shipping,
                paymentid:paymentIntent.id
        });
        console.log(paymentIntent.client_secret)
        res.json({success:true, message:"Payment intent created!", clientSecret: paymentIntent.client_secret})
       }  
    }else{
        res.json({sucess:false, message:"cannot create payment intent!!"})
    }
}else{
    res.json({sucess:false, message:"Cannot find user!"})
}
}catch (err){
console.log(err)
res.json({success:false, message:"Something went wrong"})
}
}

//Validate payment
export const confirmPayment = async (req:any, res:any ) => {
    const owner = req.user?.id
    const {paymentIntent, paymentid} = req.body
    console.log(paymentIntent)
    const order = await Order.findOne({paymentid:paymentIntent.id})
try{
if (order){
    if (paymentIntent.status == 'succeeded'){
        const filter = {paymentid:paymentIntent.id }
        const update = {payment:true}
         const doc = await Order.findOneAndUpdate(filter, update, 
          {new:true, upsert:true,  includeResultMetadata: true})
          doc.save
       
         await Cart.findOneAndDelete({owner})
         console.log(order)
        res.json({success:true, message:"Payment  Validated Successfully!"})
    }else{
        res.json({success:false, message:" Payment not validated!"})
    }
}else{
    res.json({sucess:false, message:"No Order exist"})
}
}catch (err){
console.log(err)
res.json({success:false, message:"Something went wrong"})
}
}


//Recover payment 
export const retrievePayment = async (req:any, res:any ) => {
    
    const {orderId} = req.body
try{
    const order = await Order.findOne({_id:orderId})
    const paymentId = order.paymentid
    console.log(paymentId)
if (order){
 let   paymentIntent = await stripe.paymentIntents.retrieve(`${paymentId}`);
    if (!paymentIntent) throw Error('payment failed!');
    if (paymentIntent){
        res.json({success:true, message:`Transaction status:${paymentIntent.status}, Amount Paid:$${paymentIntent.amount}`})
    }
}else{
    res.json({sucess:false, message:"Order not found"})
}
}catch (err){
console.log(err)
res.json({success:false, message:"Something went wrong"})
}
}