
import { Cart} from "../models/Cart";
import {Item} from "../models/Item";





export const getCart = async (req:any, res: any) =>{

    const owner  = req.user?.id
    if(!owner){
      res.json({ success: true, message: "No user" });
    }else{
      try{
        let cart = await Cart.findOne({owner:owner});
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
    
}
export const addToCart = async (req:any, res:any ) => {
    const owner = req.user?.id
    const {itemId}= req.body
try{
  
   const cart =await  Cart.findOne({owner:owner})
   const item = await Item.findOne({_id:itemId})

   const price = item.price
   const title = item.title
   const image = item.image
   const quantity = item.quantity
 
   if (!owner) {
    res.json({ success: false, message: "Login to add Cart" })
  }

  if (!item) {
    res.status(404).send({message:"item not found!"})
  }



 if (cart){
    let itemIndex = cart.items.findIndex((item: { itemId: any; })=>item.itemId == itemId )
    //check if product exists or not
    

    if (itemIndex > -1){
        const product  = cart.items[itemIndex]
        product.quantity += quantity
        cart.bill = cart.items.reduce((total: number, curr: { quantity: number; price: number; }) =>{
          return total + curr.quantity * curr.price
        }, 0)
        cart.items[itemIndex] = product
        await cart.save();
    res.json({ success: true, message: "Item added to Cart!" });
    }
    else {
     cart.items.push(item)
     cart.bill = cart.items.reduce((total: number, curr: { quantity: number; price: number; }) =>{
      return total + curr.quantity * curr.price
    }, 0)
     await cart.save();
    res.json({ success: true, message: "Item added to Cart!" , });
     }
    
    
 }else {
    //no cart exists, create one
    const newCart = Cart.create({
        owner,
        items:[item],
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
 const owner = req.user?.id
     const {itemId}= req.body
 try{
let cart = await Cart.findOne({owner:owner});
const itemIndex = cart.items.findIndex((item: { itemId: any; }) => item.itemId == itemId);
console.log(itemIndex)
if (itemIndex > -1) {
  let item = cart.items[itemIndex]
  cart.bill -= item.quantity * item.price
  if (cart.bill < 0) {
    cart.bill = 0
  }
  cart.items.splice(itemIndex, 1);
  cart.bill = cart.items.reduce((total: number, curr: { quantity: number; price: number; }) =>{
    return total + curr.quantity * curr.price
  }, 0)
  cart = await cart.save()
  res.json({ success: true, message: "Item deleted from Cart!" });
}else{
  res.json({ success: false, message: "item not found!" });
}
 
}catch (error) {
    console.log(error);
    res.status(400).send();
 }
}
export const clearCart = async (req:any, res:any ) => {
  const owner = req.user.id
try{
  let cart = await Cart.findOne({owner:owner});
  if (cart){
    await Cart.findOneAndDelete({owner});
    res.json({ success: true, message: "All Items cleared from Cart!" });
  }else{
    res.json({ success: true, message: "No cart exists!" });
  }

}catch (error) {
 console.log(error);
 res.status(400).send();
}
 }
 

export const addCartQty = async (req:any, res:any ) => {
  const owner = req.user.id
  const {itemId}= req.body
try{

 const cart =await  Cart.findOne({owner:owner})
 const item = await Item.findOne({_id:itemId})
if (!item) {
  res.status(404).send({message:"item not found!"})
}


if (cart){
  let itemIndex = cart.items.findIndex((item: { itemId: any; })=>item.itemId == itemId, console.log(item.id, itemId) )
  //check if product exists or not
  
  console.log(itemIndex)
  if (itemIndex > -1){
      const product  = cart.items[itemIndex]
      product.quantity += 1
      cart.bill = cart.items.reduce((total: number, curr: { quantity: number; price: number; }) =>{
        return total + curr.quantity * curr.price
      }, 0)
      cart.items[itemIndex] = product
      await cart.save();
  res.json({ success: true, message: "Item quantity increased!" , cart:cart});
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
  const owner = req.user?.id
  const {itemId}= req.body
try{

 const cart =await  Cart.findOne({owner:owner})
 const item = await Item.findOne({_id:itemId})
if (!item) {
  res.status(404).send({message:"item not found!"})
}


if (cart){
  let itemIndex = cart.items.findIndex((item: { itemId: any; })=>item.itemId == itemId, console.log(item.id, itemId) )
  //check if product exists or not
  

  if (itemIndex > -1){
      const product  = cart.items[itemIndex]
      product.quantity += -1
      cart.bill = cart.items.reduce((total: number, curr: { quantity: number; price: number; }) =>{
        return total + curr.quantity * curr.price
      }, 0)
      cart.items[itemIndex] = product
      await cart.save();
  res.json({ success: true, message: "Item quantity decreased!" , cart:cart});
  }
  
  
  
}else {
    res.json({sucess:'false', message:"Item not Found"})
  }
}catch (err){
  console.log(err);
  res.json({sucess:'false', message:"something went wrong1"})

} 
};