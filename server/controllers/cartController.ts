//@ts-nocheck
import { Cart} from "../models/Cart";
import {Item} from "../models/Item";
import { Request, Response} from "express";




export const getCart = async (req:any, res: any) =>{

    const owner  = req.user._id
    try{
        let cart = await Cart.findOne({owner});
        if(cart && cart.items.length > 0){
        
          res.json({ success: true, message: "View cart!", cart:cart });
        }
        else{
          res.json({ success: false, message: "empty cart!", cart:cart });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}
export const addToCart = async (req:any, res:any ) => {
    const owner = req.user._id
    const {itemId, price, title, image, quantity}= req.body
try{
  
   const cart =await  Cart.findOne({owner})
   const item = await Item.findOne({_id:itemId})
   
  if (!item) {
    res.status(404).send({message:"item not found!"})
  }
  // const price = item.price
  // const title = item.title
  // const quantity = item.unit
//if cart already exist for user:

 if (cart){
    let itemIndex = cart.items.findIndex(item=>item.itemId == itemId )
    //check if product exists or not

    if (itemIndex > -1){
        const product  = cart.items[itemIndex]
        product.quantity += quantity
        cart.bill = cart.items.reduce((total, curr) =>{
          return total + curr.quantity * curr.price
        }, 0)
        cart.items[itemIndex] = product
        await cart.save();
    res.json({ success: true, message: "Item added to Cart!" });
    }
    else {
     cart.items.push({itemId, title, image, quantity, price })
     cart.bill = cart.items.reduce((total, curr) =>{
      return total + curr.quantity * curr.price
    }, 0)
     await cart.save();
    res.json({ success: true, message: "Item added to Cart!" , });
     }
    
    
 }else {
    //no cart exists, create one
    const newCart = Cart.create({
        owner,
        items:[{itemId, title, image, quantity, price}],
        bill: quantity * price
    })
   
    return  res.json({ success: true, message: "Item added to Cart!" }) ;
 }
}catch (err){
    console.log(err);
    res.status(500).send("something went wrong");
 
}
}

export const deleteFromCart = async (req:any, res:any ) => {
 const owner = req.user._id
     const {itemId}= req.body
 try{
let cart = await Cart.findOne({owner});
const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
console.log(itemIndex)
if (itemIndex > -1) {
  let item = cart.items[itemIndex]
  cart.bill -= item.quantity * item.price
  if (cart.bill < 0) {
    cart.bill = 0
  }
  cart.items.splice(itemIndex, 1);
  cart.bill = cart.items.reduce((total, curr) =>{
    return total + curr.quantity * curr.price
  }, 0)
  cart = await cart.save()
  res.status(200).send(cart);
}else{
  res.json({ success: false, message: "item not found!" });
}
 
}catch (error) {
    console.log(error);
    res.status(400).send();
 }
}
export const clearCart = async (req:any, res:any ) => {
  const owner = req.user._id
try{
  let cart = await Cart.findOne({owner});
  if (cart){
    await Cart.findOneAndDelete({owner});
    res.json({ success: true, message: "Cart cleared!" });
  }else{
    res.json({ success: true, message: "No cart exists!" });
  }

}catch (error) {
 console.log(error);
 res.status(400).send();
}
 }
 

export const addCartQty = async (req:any, res:any ) => {
  const owner = req.user._id
  const {itemId}= req.body
try{

 const cart =await  Cart.findOne({owner})
 const item = await Item.findOne({_id:itemId})
if (!item) {
  res.status(404).send({message:"item not found!"})
}


if (cart){
  let itemIndex = cart.items.findIndex(item=>item.itemId == itemId, console.log(item.id, itemId) )
  //check if product exists or not
  
  console.log(itemIndex)
  if (itemIndex > -1){
      const product  = cart.items[itemIndex]
      product.quantity += 1
      cart.bill = cart.items.reduce((total, curr) =>{
        return total + curr.quantity * curr.price
      }, 0)
      cart.items[itemIndex] = product
      await cart.save();
  res.json({ success: true, message: "Item added to Cart!" , cart:cart});
  }
  
  
  
}else {
  res.status(404);
  throw new Error("Item not found");
  }
}catch (err){
  console.log(err);
  res.status(500).send("something went wrong");

} 
};

export const decreaseCartQty = async (req:any, res:any ) => {
  const owner = req.user._id
  const {itemId}= req.body
try{

 const cart =await  Cart.findOne({owner})
 const item = await Item.findOne({_id:itemId})
if (!item) {
  res.status(404).send({message:"item not found!"})
}


if (cart){
  let itemIndex = cart.items.findIndex(item=>item.itemId == itemId, console.log(item.id, itemId) )
  //check if product exists or not
  

  if (itemIndex > -1){
      const product  = cart.items[itemIndex]
      product.quantity += -1
      cart.bill = cart.items.reduce((total, curr) =>{
        return total + curr.quantity * curr.price
      }, 0)
      cart.items[itemIndex] = product
      await cart.save();
  res.json({ success: true, message: "Item removed from Cart!" , cart:cart});
  }
  
  
  
}else {
  res.status(404);
  throw new Error("Item not found");
  }
}catch (err){
  console.log(err);
  res.status(500).send("something went wrong");

} 
};