
import { Cart} from "../models/Cart";
import {Item} from "../models/Item";

//Retrieve User cart
export const getCart = async (req:any, res: any) =>{

    const owner  = req.user?._id

      try{
        let cart = await Cart.findOne({owner:owner});
        if(cart && cart.items.length > 0){
           console.log(cart)
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
    
// Add itemms to Cart
export const addToCart = async (req:any, res:any ) => {
     const owner = req.user?._id
    const {itemId}= req.body
    console.log(itemId, owner)
    const cart =await  Cart.findOne({owner:owner})
    const item = await Item.findById(itemId)
  
      try{
         
        if (!owner) {
       return   res.status(401).json({ success: false, message: "Login to add Cart" })
      }
    
      if (!item) {
       return  res.status(404).send({message:"item not found!"})
      }
       
        console.log(item)
        const price = item?.price
        const unit = item?.unit
     
     
     
      if (cart){
         let itemIndex = cart.items.findIndex((item:any)=>item?._id == itemId )
         //check if product exists or nots
         if (itemIndex > -1){
             const product  = cart.items[itemIndex]
             product.unit += unit
             cart.bill = cart.items.reduce((total: number, curr: { unit: number; price: number; }) =>{
               return total + curr.unit * curr.price
             }, 0)
             cart.items[itemIndex] = product
             await cart.save();
         return res.status(200).json({ success: true, message: "Item added to Cart!" });
         }
         else {
          cart.items.push(item)
          cart.bill = cart.items.reduce((total: number, curr: { unit: number; price: number; }) =>{
           return total + curr.unit * curr.price
         }, 0)
          await cart.save();
       return  res.status(201).json({ success: true, message: "Item added to Cart!" , cart:cart });
          }
         
         
      }else {
         //no cart exists, create one
         const newCart = Cart.create({
             owner,
             items:[item],
             bill: unit * price
         })
         return  res.status(200).json({ success: true, message: "Item added to Cart!", cart:newCart }) ;
      }
     }catch (err){
         console.log(err);
         res.status(500).send("something went wrong");
      
     }
    }


//Remove selected items from cart
export const deleteFromCart = async (req:any, res:any ) => {
 const owner = req.user?._id
     const {itemId}= req.body
     let cart = await Cart.findOne({owner:owner});
 try{
const itemIndex = cart.items.findIndex((item:any) => item._id == itemId);
console.log(itemIndex)
if (itemIndex > -1) {
  let item = cart.items[itemIndex]
  cart.bill -= item.unit * item.price
  if (cart.bill < 0) {
    cart.bill = 0
  }
  cart.items.splice(itemIndex, 1);
  cart.bill = cart.items.reduce((total: number, curr: { unit: number; price: number; }) =>{
    return total + curr.unit * curr.price
  }, 0)
  cart = await cart.save()
return  res.json({ success: true, message: "Item deleted from Cart!" });
}
 
}catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
 }
}
// Clear all items in cart
export const clearCart = async (req:any, res:any ) => {
  const owner = req.user?.id
try{
  let cart = await Cart.findOne({owner:owner});
  if (cart){
    await Cart.findOneAndDelete({owner});
  return  res.json({ success: true, message: "All Items cleared from Cart!" });
  }else{
  return  res.json({ success: true, message: "No cart exists!" });
  }

}catch (error) {
 console.log(error);
res.status(500).send("something went wrong");
}
 }
 

 //Increase quantity of selected cart items
export const addCartQty = async (req:any, res:any ) => {
  const owner = req.user?._id
  const {itemId}= req.body
  const cart =await  Cart.findOne({owner:owner})
  const item = await Item.findById(itemId)

try{
  if (!item) {
    return  res.status(404).send({message:"item not found!"})
    }

if (cart){
  let itemIndex = cart.items.findIndex((item: any)=>item._id == itemId, console.log(item.id, itemId) )
  //check if product exists or not
  
  console.log(itemIndex)
  if (itemIndex > -1){
      const product  = cart.items[itemIndex]
      product.unit += 1
      cart.bill = cart.items.reduce((total: number, curr: { unit: number; price: number; }) =>{
        return total + curr.unit * curr.price
      }, 0)
      cart.items[itemIndex] = product
      await cart.save();
   return res.json({ success: true, message: "Item unit increased!" , cart:cart});
  }
  
}else {
 return res.status(404).send({message:"Cart not found!"})
  
  }
}catch (err){
  console.log(err);
  res.status(500).send("something went wrong");

} 
};


 //Decrease quantity of selected cart items
export const decreaseCartQty = async (req:any, res:any ) => {
  const owner = req.user?._id
  const {itemId}= req.body
  const cart =await  Cart.findOne({owner:owner})
  const item = await Item.findById(itemId)
try{


if (!item) {
return  res.status(401).send({message:"item not found!"})
}


if (cart){
  let itemIndex = cart.items.findIndex((item: any)=>item._id == itemId, console.log(item.id, itemId) )
  //check if product exists or not
  

  if (itemIndex > -1){
      const product  = cart.items[itemIndex]
      product.unit += -1
      cart.bill = cart.items.reduce((total: number, curr: { unit: number; price: number; }) =>{
        return total + curr.unit * curr.price
      }, 0)
      cart.items[itemIndex] = product
      await cart.save();
 return res.json({ success: true, message: "Item unit decreased!" , cart:cart});
  }
  
  
  
}else {
  return res.status(404).send({message:"Cart not found!"})
  
  }
}catch (err){
  console.log(err);
 return res.json({sucess:'false', message:"something went wrong"})

} 
};