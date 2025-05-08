
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
  const owner   = req.user?._id
  console.log(owner)
     const {firstname,lastname, mobile, mobile2, address,nation, region,postalcode, province, ordernote}  = req.body
     try{
      const newaddress =  await Address.create(
        {owner, firstname,lastname, mobile, mobile2, address,nation, 
            region,postalcode, province, ordernote,
    });
    
     res.json({success:true, message:"Default address saved!", address:newaddress})
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

