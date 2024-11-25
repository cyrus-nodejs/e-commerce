// /* eslint-disable @typescript-eslint/ban-ts-comment */
// // @ts-nocheck
// import { createContext, useState , useEffect, } from 'react'
// import axios from 'axios';
// import {loadStripe} from '@stripe/stripe-js';
// import { checkOutType} from '../utils/@types';
// import React from 'react';
// export const CheckoutContext = createContext<checkOutType >(null!)
// export const CheckoutProvider = ({ children}:{ children: React.ReactNode }) => {
   
//   const [ stripePromise, setStripePromise ] = useState("");
//   const [ clientSecret, setClientSecret ] = useState('');
//   const [gift, setGift] = useState<number>(0)
//   const [shipping, setShipping] = useState<number>(5)

//   const getConfig = async () => {
//     try {

//       const { data } = await axios.get(
//         "https://emall-server.onrender.com/config",
//         {withCredentials: true}
//       );
      
//       const { success, message, publishableKey } = data;
//       if (success) {
//           setStripePromise(loadStripe(publishableKey));
//       } else {
//         console.log(message)
      
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }


//   const getsecret = async () => {
//     // Create PaymentIntent as soon as the page loads
//     try {
  
//       const { data } = await axios.get(
//         "https://emall-server.onrender.com/create-payment-intent",
//         {withCredentials: true}
//       );
      
//       const { success, message, clientSecret } = data;
//       if (success) {
//           setClientSecret(clientSecret)
//     } else {
//       console.log(message);
    
//     }
//     } catch (error) {
//       console.log
//     }
//  }
 
  
//   useEffect(() => {
//      getConfig()

//   }, [stripePromise]);
  

// //   useEffect(() => {

// //  getsecret()
// //  }, []);


//     return (
//         <CheckoutContext.Provider
//           value={{
//       stripePromise,
//       setStripePromise,
//       clientSecret,
//       setClientSecret,
//       getsecret,
//        gift,
//        setGift,
//        shipping,
//        setShipping,
//           }}
//         >
//           {children}
//         </CheckoutContext.Provider>
//       );

// }