 
// import { createContext, useState, useEffect,  } from 'react'
// import axios from "axios";
// import {cartType } from '../utils/@types';
// import {ITEM, ORDERITEM,  CARTITEM} from '../utils/@types';
// import React from 'react'


// export const CartContext = createContext<cartType>(null!);


// export const CartProvider = ({ children}:{ children: React.ReactNode } ) => {
//     const [cartItems, setCartItems] = useState([])
//     const [bills, setBills] = useState('')
//     const [cartMessage,setCartMessage] = useState("")
    
    
  
//   const getCart = async () : Promise<void> => {
  
    
//     try {
//       const { data } = await axios.get(
//         "https://emall-server.onrender.com/cart",
//         {withCredentials: true}
//       );
      
//       const { success, message, cart} = data;
//       if (success) {
//         setBills(cart.bill)
//         setCartItems(cart.items)
        
//       } else {
//        console.log(message);
       
       
//       }
//     } catch (error) {
//       console.log(error)
//     }
    
  
    

//   }

    
//   const addCart = async (item:ORDERITEM )  => {
//     const itemId = item.itemId
//     const quantity = item.quantity
//     const title = item.title
//     const price = item.price
//     const image = item.image
  
//     try {
//       const { data } = await axios.post(
//         "https://emall-server.onrender.com/cart",
//         {
//         itemId,
//         quantity,
//         title,
//         price,
//         image,
//         },
//         {withCredentials: true}
//       );
      
//       const { success, message} = data;
//       if (success) {
//         setCartMessage(message)

//       console.log(message)
        
//       } else {
//         console.log(message);
      
      
       
//       }
//     } catch (error) {
//       console.log(error)
    
//     }
//   }
     
    

//   const addToCart = async (item:ITEM )  => {
//     const itemId = item._id
//     const quantity = item.unit
//     const title = item.title
//     const price = item.newprice
//     const image = item.image
  
//     try {
//       const { data } = await axios.post(
//         "https://emall-server.onrender.com/cart",
//         {
//         itemId,
//         quantity,
//         title,
//         price,
//         image,
//         },
//         {withCredentials: true}
//       );
      
//       const { success, message} = data;
//       if (success) {
//         setCartMessage(message)

//       console.log(message)
        
//       } else {
//         console.log(message);
    
      
       
//       }
//     } catch (error) {
//       console.log(error)
    
//     }
//   }

//   const reduceQty = async (item:CARTITEM) => {
//     const itemId = item.itemId
    
//     try {
//       const { data } = await axios.post(
//         "https://emall-server.onrender.com/reducecart",
//         {
//         itemId,
       
//         },
//         {withCredentials: true}
//       );
      
//       const { success, message} = data;
//       if (success) {
        
        
//         setCartMessage(message)
        
    
//       console.log(message)
        
//       } else {
        
//        console.log(message)
       
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   const addQty = async (item:CARTITEM) => {
//     const itemId = item.itemId
   
//     console.log(itemId)
//     try {
//       const { data } = await axios.post(
//         "https://emall-server.onrender.com/addcart",
//         {
//         itemId,
//         },
//         {withCredentials: true}
//       );
      
//       const { success, message} = data;
//       if (success) {
        
//         setCartMessage(message)
        
        
    
//       console.log(message)
        
//       } else {
       
//        console.log(message)
       
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
 
//   const deleteFromCart = async (item:CARTITEM)  => {
//     const itemId = item.itemId
    
//     console.log(itemId,)
//     try {
//       const { data } = await axios.post(
//         "https://emall-server.onrender.com/deletecart",
//         {
//         itemId,
//         },
//         {withCredentials: true}
//       );
      
//       const { success, message} = data
//       if (success) {
//         setCartMessage(message)
//       console.log(message)
//       } else {
       
//        console.log(message)
       
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const clearCart = async () => {
    
//     try {
//       const { data } = await axios.get(
//         "https://emall-server.onrender.com/clearcart",
//         {withCredentials: true}
//       );
      
//       const { success, message} = data
//       if (success) {
//         setCartMessage(message)
//       console.log(message)
//       } else {
  
//        console.log(message)
       
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   const getCartTotal = () => {
//     return bills
//   };


//  console.log(getCartTotal())
  

  

  
//   useEffect(() =>{
//     getCart();
  
//       }, [cartItems, bills])
  
//   console.log(cartItems)
//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         clearCart,
//         getCartTotal,
//         deleteFromCart,
//         addQty,
//         reduceQty,
//         addCart,
//         cartMessage,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };