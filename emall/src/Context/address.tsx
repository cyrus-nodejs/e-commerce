// /* eslint-disable @typescript-eslint/ban-ts-comment */
// // @ts-nocheck
// import { createContext, useState, useEffect  } from 'react'
// import axios from 'axios';
// import React from 'react';
// import { addressType } from '../utils/@types';



// export const AddressContext = createContext<addressType>(null!)
// export const AddressProvider = ({ children}:{ children: React.ReactNode }) => {
   

//   const [destination, setDestination] = useState([])
 
  
//    const getAddress = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://emall-server.onrender.com/getaddress",
//         {withCredentials: true}
//       );
      
//       const { success, message, address } = data;

//       if (success) {
//         setDestination(address)
//         console.log(`This is ${address}`)
//       } else {
//         console.log(message);
      
       
//       }
//     } catch (error) {
//       console.log(error)
//     }
    
  
    

//   }

  
//   useEffect(() => {
//     getAddress();
 
//  }, [destination] );

 
// console.log(destination)
//     return (
//         <AddressContext.Provider
//           value={{
//       destination,
//           }}
//         >
//           {children}
//         </AddressContext.Provider>
//       );

// }