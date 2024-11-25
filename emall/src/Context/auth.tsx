 
// import { createContext, useState, useEffect } from 'react'
// import axios from "axios";
// import { authType} from '../utils/@types';
// import React from 'react';


// export const AuthContext = createContext<authType >(null!)
// export const AuthProvider = ({ children}:{ children: React.ReactNode }) => {


//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
//     const [updateUser, setIsupdateUser] = useState(null)
   
     
    
    


//    const getUser = async () => {
//      try {
//       const { data } = await axios.post(
//         "https://emall-server.onrender.com",  {},
//         { withCredentials: true }
//       );
//       const { success, user, message } = data;
  
//       if (success) {
//         setIsupdateUser(user)
//         setIsAuthenticated(true)
      
//         } else {
         
//          console.log(message)
        
//         }
//      }catch (err){
//       console.log(err)
//      }
  
//   };
//     useEffect(() => {
     
//       getUser();
      
//     }, [updateUser])
    
  
//     const Logout = async () => {
//       try {
      
//        const {data} = await  axios.post("https://emall-server.onrender.com/logout", {}, {withCredentials: true})
    
//        const { success, message} = data;
//          if (success) {
//           setIsAuthenticated(false)
//           setIsupdateUser(null)
        

           
//          }
//          else {
//            console.log(message);
           
//          }
//       } catch (error) {
//         console.log(error)
//       }
      
//     }
    

   
  
   
// console.log(updateUser)

//     return (
//         <AuthContext.Provider
//           value={{
//             Logout,
//             isAuthenticated,
//             updateUser,
//             setIsAuthenticated,
        
//           }}
//         >
//           {children}
//         </AuthContext.Provider>
//       );

// }