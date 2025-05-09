
import { Address} from "../models/Address"

// Retrieve user addresses
export const getAddress = async (req:any, res:any) => {
    const owner  =  req.user?.id
        try{
            const address = await Address.findOne({owner:owner})
            if(address ){
              res.json({ success: true, message: "View address!", address:address});
            }
            else{
              res.json({ success: false, message: "Address not Found!" });
            }
        }catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    
       }

    











//create user address 
export const createAddress = async (req:any, res:any) => {
 
     try{
      if ((!req.user || !req.user.id)){
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const newaddress =  await Address.create(
        {
          ...req.body,
      owner: req.user.id, // 👈 ensure owner is set
    });
    
     res.status(200).json({success:true, message:"Default address saved!", address:newaddress})
    }
    catch(err){
        console.log(err)
        res.status(500).send("Something went wrong");
    }
}

   //Update user adress
export const updateAddress = async (req:any, res:any) => {
    const id  = req.user?.id
         try {
            const updatedItem = await Address.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedItem) {
              return res.json({sucesss:true, message: 'Item not found' });
            }
            console.log(updatedItem)
            res.json({success:true, message:"Address book updated successfully"});
          } catch (error) {
            res.json({ message: 'Server Error', error });
          }
}

