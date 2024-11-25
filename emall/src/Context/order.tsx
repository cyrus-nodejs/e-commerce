// /* eslint-disable react-hooks/exhaustive-deps */

// import { createContext, useState, useEffect  } from 'react'
// import axios from 'axios';
// import { orderType } from '../utils/@types';




// export const OrderContext = createContext<orderType>(null!)
// export const OrderProvider = ({ children}:{ children: React.ReactNode }) => {
   

  
//   const [Order, setOrder] = useState([])
//   const [orderItems, setOrderItems] = useState([])
//   const [existingOrder, setExistingOrder] = useState([])
//   const  [orderinvoice, setOrderInvoice] = useState([])
//    const getOrder = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://emall-server.onrender.com/getorder",
//         {withCredentials: true}
//       );
      
//       const { success, message, order } = data;

//       if (success) {
//         setOrder(order)
//        setOrderItems(order[0].items)
//       } else {
//         console.log(message);
      
       
//       }
//     } catch (error) {
//       console.log(error)
//     }
    
  
    

//   }

  
//   const getExistingOrder = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://emall-server.onrender.com/invoice",
//         {withCredentials: true}
//       );
      
//       const { success, message, order } = data;

//       if (success) {
      
//         setExistingOrder(order)
//       } else {
//         console.log(message);
      
       
//       }
//     } catch (error) {
//       console.log(error)
//     }
    
  
    

//   }

  
//   useEffect(() => {
//     orderinvoice
 
//  }, [orderinvoice] );
  
  
//   useEffect(() => {
//     getOrder();
 
//  }, [Order, orderItems] );

//  useEffect(() => {
//   getExistingOrder();

// }, [existingOrder] );


//  console.log(Order)
//  console.log(existingOrder)
//  console.log(orderItems)

 
//     return (
//         <OrderContext.Provider
//           value={{
//             orderItems,
//       Order,
//       existingOrder,
//       setOrderInvoice,
//           }}
//         >
//           {children}
//         </OrderContext.Provider>
//       );

// }