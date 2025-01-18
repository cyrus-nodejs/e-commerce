import { User } from '../models/User'
import passport from "../middlewares/passport/index"


//Save  & register User to database
// export const AdminRegister = async (req: any, res: any, ) => {
//     try {
//       User.register(new User({ email: req.body.email, username: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, role:req.body.role, }), req.body.password, function (err: string, user: Express.User) {
//         if (err) {
//           res.json({ success: false, message: "Your account could not be saved. Error: " + err });
//         }
//         else {
  
//           req.login(user, (err: any) => {
  
//             if (err) {
//               res.json({ success: false, message: err });
//             }
//             else {
//               console.log(req.user)
//               res.json({ success: true, message: "Your account has been saved" });
//               // res.json({ success: true, message: "Your account has been saved" }); 
//             }
//           });
//         }
//       })
  
//     } catch (error) {
//       console.log(error)
//     }
  
//   }

//Assign  reseller role to customer
  export const AssignReseller = async (req: any, res: any, ) => {
    const {email} = req.body
console.log(email)

    try {
     const filter = {email: email}
     const update = {role: 'reseller'}
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