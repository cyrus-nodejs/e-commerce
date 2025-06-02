import { Request, Response } from 'express';
import { Address} from "../models/Address"
import { IUser } from '../models/User';
// Retrieve user addresses
export const getAddress = async (req:Request, res:Response) => {
   const user = req.user as IUser
 const userId = user._id

const address = await Address.findById(userId)
  try{

    if(address ){
    return res.status(200).json({ success: true, message: "View address!", address:address});
    }
    else{
    return   res.status(403).json({ success: false, message: "Address not Found!" });
    }
  }catch (err) {
            console.log(err);
          return  res.status(500).send("Something went wrong");
        }
    
       }

    











//create user address 
export const createAddress = async (req:Request, res:Response) => {
 const user = req.user as { _id: string }
 const userId = user._id
  try{
    
     
    const newaddress =  await Address.create({...req.body, owner: userId });// 👈 ensure owner is set
    return res.status(200).json({success:true, message:"Default address saved!", address:newaddress})
    }
    catch(err){
        console.log(err)
      return  res.status(500).send("Something went wrong");
    }
}

   //Update user adress
export const updateAddress = async (req:Request, res:Response) => {
   const user = req.user as { _id: string }
 const userId = user._id


try {
  const updatedItem = await Address.findByIdAndUpdate(userId, req.body, { new: true });
  
  if (updatedItem) {
  return  res.status(200).json({success:true, message:"Address book updated successfully"});
}
console.log(updatedItem)
return res.json({sucesss:true, message: 'Address not updated' });
} catch (error) {
 return  res.status(500).json({ message: 'Server Error'});
          }
}

