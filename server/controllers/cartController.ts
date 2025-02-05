
import { Cart} from "../models/Cart";
import {Item} from "../models/Item";




//Retrieve User cart
export const getCart = async (req:any, res: any) =>{

    const owner  = req.user?.id

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
    
// Add itemms to Cart
export const addToCart = async (req:any, res:any ) => {
    const owner = req.user?.id
    const {itemId}= req.body
    console.log(itemId, owner)
      try{
        const cart =await  Cart.findOne({owner:owner})
        const item = await Item.findOne({_id:itemId})
     
        const price = item.price
       
        const unit = item.unit
      
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
             product.unit += unit
             cart.bill = cart.items.reduce((total: number, curr: { unit: number; price: number; }) =>{
               return total + curr.unit * curr.price
             }, 0)
             cart.items[itemIndex] = product
             await cart.save();
         res.json({ success: true, message: "Item added to Cart!" });
         }
         else {
          cart.items.push(item)
          cart.bill = cart.items.reduce((total: number, curr: { unit: number; price: number; }) =>{
           return total + curr.unit * curr.price
         }, 0)
          await cart.save();
         res.json({ success: true, message: "Item added to Cart!" , });
          }
         
         
      }else {
         //no cart exists, create one
         const newCart = Cart.create({
             owner,
             items:[item],
             bill: unit * price
         })
        
         return  res.json({ success: true, message: "Item added to Cart!" }) ;
      }
     }catch (err){
         console.log(err);
         res.status(500).send("something went wrong");
      
     }
    }


//Remove selected items from cart
export const deleteFromCart = async (req:any, res:any ) => {
 const owner = req.user?.id
     const {itemId}= req.body
 try{
let cart = await Cart.findOne({owner:owner});
const itemIndex = cart.items.findIndex((item: { itemId: any; }) => item.itemId == itemId);
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
  res.json({ success: true, message: "Item deleted from Cart!" });
}else{
  res.json({ success: false, message: "item not found!" });
}
 
}catch (error) {
    console.log(error);
    res.status(400).send();
 }
}
// Clear all items in cart
export const clearCart = async (req:any, res:any ) => {
  const owner = req.user?.id
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
 

 //Increase quantity of selected cart items
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
      product.unit += 1
      cart.bill = cart.items.reduce((total: number, curr: { unit: number; price: number; }) =>{
        return total + curr.unit * curr.price
      }, 0)
      cart.items[itemIndex] = product
      await cart.save();
  res.json({ success: true, message: "Item unit increased!" , cart:cart});
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


 //Decrease quantity of selected cart items
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
      product.unit += -1
      cart.bill = cart.items.reduce((total: number, curr: { unit: number; price: number; }) =>{
        return total + curr.unit * curr.price
      }, 0)
      cart.items[itemIndex] = product
      await cart.save();
  res.json({ success: true, message: "Item unit decreased!" , cart:cart});
  }
  
  
  
}else {
    res.json({sucess:'false', message:"Item not Found"})
  }
}catch (err){
  console.log(err);
  res.json({sucess:'false', message:"something went wrong1"})

} 
};