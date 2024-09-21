 
import { createContext, useState, useEffect } from 'react'
import axios from "axios";
import { authType} from '../utils/@types';
import React from 'react';


export const AuthContext = createContext<authType >(null!)
export const AuthProvider = ({ children}:{ children: React.ReactNode }) => {


    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [updateUser, setIsupdateUser] = useState(null)
   
     
    
    


   const getUser = async () => {
     try {
      const { data } = await axios.post(
        "http://localhost:3000",  {},
        { withCredentials: true }
      );
      const { success, user, message } = data;
  
      if (success) {
        setIsAuthenticated(true),
        setIsupdateUser(user)
      
        } else {
         
         console.log(message)
         alert(message)
        }
     }catch (err){
      alert(err)
     }
  
  };
    useEffect(() => {
     
      getUser();
      
    }, [])
    
  
    const Logout = async () => {
      try {
      
       const {data} = await  axios.post("http://localhost:3000/logout", {}, {withCredentials: true})
    
       const { success, message} = data;
         if (success) {
          setIsAuthenticated(false)
          setIsupdateUser(null)
        

           
         }
         else {
           console.log(message);
           
         }
      } catch (error) {
        console.log(error)
      }
      
    }
    

   
  
   
console.log(updateUser)

    return (
        <AuthContext.Provider
          value={{
            Logout,
            isAuthenticated,
            updateUser,
            setIsAuthenticated,
        
          }}
        >
          {children}
        </AuthContext.Provider>
      );

}