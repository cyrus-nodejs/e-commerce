
import { Address} from "../models/Address"

// Retrieve user addresses
export const getAddress = async (req:any, res:any) => {
    const owner  =  req.user?._id
        try{
            const address = await Address.findOne({owner:owner})
            if(address ){
             return res.status(200).json({ success: true, message: "View address!", address:address});
            }
            else{
              return   res.status(403).json({ success: false, message: "Address not Found!" });
            }
        }catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    
       }

    











//create user address 
export const createAddress = async (req:any, res:any) => {
 
     try{
      if ((!req.user || !req.user._id)){
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const newaddress =  await Address.create(
        {
          ...req.body,
      owner: req.user._id, // 👈 ensure owner is set
    });
    
    return res.status(200).json({success:true, message:"Default address saved!", address:newaddress})
    }
    catch(err){
        console.log(err)
      return  res.status(500).send("Something went wrong");
    }
}

   //Update user adress
export const updateAddress = async (req:any, res:any) => {
    const id  = req.user?._id
         try {
            const updatedItem = await Address.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedItem) {
              return  res.status(200).json({success:true, message:"Address book updated successfully"});
           
            }
            console.log(updatedItem)
            return res.json({sucesss:true, message: 'Adrress not updated' });
          } catch (error) {
          return  res.status(500).json({ message: 'Server Error'});
          }
}

