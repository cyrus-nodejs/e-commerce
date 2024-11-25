
import { Address} from "../models/Address"


export const getAddress = async (req:any, res:any) => {
    const owner  =  req.user?.id
    if (!owner) {
        res.json({success:false, message:"Pls Login?"})
      }
       else{
        try{
            let address = await Address.findOne({owner:owner})
                if (!address) {
                  res.json({success:false,message:"Address not found!"})
                }
          
            console.log(`This is ${address}`)
            if(address ){
               
              res.json({ success: true, message: "View address!", address:address});
            }
            else{
              res.json({ success: false, message: "No adress yet!" });
            }
        }catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    
       }

    
}











export const createAddress = async (req:any, res:any) => {
    const owner   = req.user?.id
     const {firstname,lastname, mobile, mobile2, address,nation, 
     region,postalcode, province, ordernote}  = req.body
         console.log(req.body.firstname)
         console.log(req.body)
 try{
         const location = await Address.create({owner, firstname,lastname, mobile, mobile2, address,nation, 
            region,postalcode, province, ordernote,
    });
    console.log(location)
     res.json({success:true, message:"Default address saved!"})
     
       
      
    }
    catch(err){
        console.log(err)
        res.status(500).send("Something went wrong");
    }
}

export const updateAddress = async (req:any, res:any) => {
    const user  = req.user.id
     const {firstname,lastname, mobile, mobile2, address,nation, 
     region,postalcode, province, ordernote}  = req.body
         console.log(req.body.firstname)
         console.log(req.body)
 try{
     
    const filter = {owner: user }
    const update = {firstname:firstname, lastname:lastname, mobile:mobile, mobile2:mobile2,
       address:address, nation:nation, region:region,postalcode:postalcode, province:province, ordernote:ordernote
    }
     const doc = await Address.findOneAndUpdate(filter, update, 
      {new:true, upsert:true,  includeResultMetadata: true})
      doc.save
    }
    catch(err){
        console.log(err)
        res.status(500).send("Something went wrong");
    }
}

