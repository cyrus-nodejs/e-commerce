import { User } from '../models/User'
import { Order } from '../models/Order'
import passport from "../middlewares/passport/index"


  export const  AllOrders= async (req:any, res:any ) => {
console.log(`My ${req.user}`)
    await Order.find({payment:true}).sort({date:-1}).then((items: any) => res.json(items)).catch((err: string) => res.json("Error : " + err));
    
   }


   export const  AllCustomers= async (req:any, res:any ) => {
    console.log(`My ${req.user}`)
        await User.find({role:'customer'}).sort({date:-1}).then((users: any) => res.json(users)).catch((err: string) => res.json("Error : " + err));
        
   }

   export const  AllResellers= async (req:any, res:any ) => {
    console.log(`My ${req.user}`)
        await User.find({role:'reseller'}).sort({date:-1}).then((users: any) => res.json(users)).catch((err: string) => res.json("Error : " + err));
        
   }

   export const  AllCustomerService= async (req:any, res:any ) => {
  
        await User.find({role:'customer service'}).sort({date:-1}).then((users: any) => res.json(users)).catch((err: string) => res.json("Error : " + err));
        
   }

   export const  AllAdmins= async (req:any, res:any ) => {
    console.log(`My ${req.user}`)
        await User.find({role:'admin'}).sort({date:-1}).then((users: any) => res.json(users)).catch((err: string) => res.json("Error : " + err));
        
   }







  export const AssignReseller = async (req: any, res: any, ) => {
    const {email} = req.body
console.log(email)

    try {
     const filter = {email: email}
     const update = {role:'reseller'}
      const doc = await User.findOneAndUpdate(filter, update, 
       {new:true, upsert:true,  includeResultMetadata: true})
       doc.save
    } catch (error) {
      console.log(error)
    }
  
  }

  //Assign  Customer service role to staff
  export const AssignCustomerService = async (req: any, res: any, ) => {
    const {email} = req.body
  console.log(email)
    try {
        const filter = {email: email}
        const update = {role: 'customer service'}
         const doc = await User.findOneAndUpdate(filter, update, 
          {new:true, upsert:true,  includeResultMetadata: true})
          doc.save
    } catch (error) {
      console.log(error)
    }
  
  }

 //Assign  Admin service role to staff
  export const AssignAdmin = async (req: any, res: any, ) => {
    const {email} = req.body
  const user =  User.findOne({email:email})
    try {
        const filter = {email: email}
        const update = {role: 'admin'}
         const doc = await User.findOneAndUpdate(filter, update, 
          {new:true, upsert:true,  includeResultMetadata: true})
          doc.save
    } catch (error) {
      console.log(error)
    }
  
  }


  export const AdminDashboard = async (req: any, res: any, ) => {
   
    res.json({ message: 'Welcome to the Admin Dashboard' });
  
  }