import { User, IUser } from '../models/User'
import { Order } from '../models/Order'
import { Request, Response } from 'express'


  export const  AllOrders= async (req:Request, res:Response ) => {
     const user = req.user as IUser
     console.log(user)
    await Order.find({owner:user?._id}).sort({date:-1}).then((items: any) => res.json(items)).catch((err: string) => res.json("Error : " + err));
    
   }


   export const  AllCustomers= async (req:Request, res:Response ) => {

        await User.find({role:'customer'}).sort({date:-1}).then((users: any) => res.json(users)).catch((err: string) => res.json("Error : " + err));
        
   }

   export const  AllResellers= async (req:Request, res:Response ) => {
  
        await User.find({role:'reseller'}).sort({date:-1}).then((users: any) => res.json(users)).catch((err: string) => res.json("Error : " + err));
        
   }

   export const  AllCustomerService= async (req:Request, res:Response ) => {
  
        await User.find({role:'customer service'}).sort({date:-1}).then((users: any) => res.json(users)).catch((err: string) => res.json("Error : " + err));
        
   }

   export const  AllAdmins= async (req:Request, res:Response ) => {
  
        await User.find({role:'admin'}).sort({date:-1}).then((users: any) => res.json(users)).catch((err: string) => res.json("Error : " + err));
        
   }







  export const AssignReseller = async (req: any, res: any, ) => {
    const {email} = req.body

    try {
     const filter = {email: email}
     const update = {role:'reseller'}
      const updateUser = await User.findOneAndUpdate(filter, update, 
       {new:true, upsert:true,  includeResultMetadata: true})
    
    } catch (error) {
      console.log(error)
    }
  
  }

  //Assign  Customer service role to staff
  export const AssignCustomerService = async (req: any, res: any, ) => {
    const {email} = req.body

    try {
        const filter = {email: email}
        const update = {role: 'customer service'}
         const updateUser  = await User.findOneAndUpdate(filter, update, 
          {new:true, upsert:true,  includeResultMetadata: true})
        
    } catch (error) {
      console.log(error)
    }
  
  }

 //Assign  Admin service role to staff
  export const AssignAdmin = async (req: any, res: any, ) => {
    const {email} = req.body
 
    try {
        const filter = {email: email}
        const update = {role: 'admin'}
         const updateUser  = await User.findOneAndUpdate(filter, update, 
          {new:true, upsert:true,  includeResultMetadata: true})
        
    } catch (error) {
      console.log(error)
    }
  
  }


  export const AdminDashboard = async (req: any, res: any, ) => {
   
  return  res.json({ message: 'Welcome to the Admin Dashboard' });
  
  }