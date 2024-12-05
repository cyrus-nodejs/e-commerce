
import { Category, Item, View} from "../models/Item";

  export const  getAllItems = async (req:any, res:any ) => {
console.log(`My ${req.user}`)
    await Item.find().sort({date:-1}).then((items: any) => res.json(items)).catch((err: string) => res.json("Error : " + err));
    
   }

 export  const postItem = async  (req:any, res:any ) => {

const {title, description, category, price, discount, status,
  trending, quantity, recommended, topfeatured, topdeals } = req.body
  if (!req.file) {
    // No file was uploaded
    return res.status(400).json({ error: "No file uploaded" });
  }

  
  const image = req.file.path
   
console.log(req.body)
const discountAmount= discount * 0.01 * price
const newprice = Math.round(price - discountAmount)
   const newItemData = {
    title,
    description,
     image,
       trending,
       category,
       recommended,
       topfeatured,
       topdeals,
       newprice,
     price,
     quantity,
     discount,
     status,
   }
  
    const newItem = new Item(newItemData)
    const filter = {category: category }
    const update = {$addToSet:{item : newItem}}
     const doc = await Category.findOneAndUpdate(filter, update, 
      {new:true, upsert:true,  includeResultMetadata: true})
      doc.save
  newItem.save()
  .then(() => res.json(newItem), res.status(200).json)
    .catch((err: string) => res.json(err))
   }
  

 

   
export const  updateItem = async (req:any, res:any ) => {
  const admin = req.user.id
  const {title, description, category, price, discount, status,
    trending, quantity, recommended, topfeatured, topdeals } = req.body
  try{
    const filter = {category: category }
    const update = {title, description, category, price, discount, status,
      trending, quantity, recommended, topfeatured, topdeals}
     const doc = await Item.findOneAndUpdate(filter, update, 
      {new:true, upsert:true,  includeResultMetadata: true})
      doc.save
  
  }catch(err){
    console.log(err)
  }
} 

export const deleteItem = async (req:any, res:any ) => {
  const admin = req.user.id
  const {itemId}= req.body
try{
  let item = await Item.findOne({_id:itemId});
  if (item){
    await Item.findOneAndDelete({_id:itemId});
    res.json({ success: true, message: "Item removed from database" });
  }else{
    res.json({ success: true, message: "No cart exists!" });
  }

}catch (error) {
 console.log(error);
 res.status(400).send();
}
}






export const searchItem = async (req:any, res:any ) => {
const searchitem = req.query
await Item.find({ title: { $regex: `${searchitem}`, $options: "i" }}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))

}


export const  typeCategory = async (req:any, res:any ) => {

 await Category.find().sort({date:-1}).then((items: any) => res.json(items)).catch((err: string) => res.json("Error : " + err));
 
}

export const getCategory = async (req:any, res:any ) => {
  try{
   const item =  await Item.find({category:req.params.id})
  console.log(item)
  if (item){
    console.log(item)
   res.json({success:true, message:"categories sorted!", item:item})
  }
  }catch (err){
    res.json({success:false, message:"No categories!"})
  }
 
 }


 export const getItemDetails = async (req:any, res:any ) => {

  await Item.find({title:req.params.id}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
 
 
  }

  
  export const trending = async (req:any, res:any ) => {
    await Item.find({trending:"true"}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
     }
 

 export const recommended = async (req:any, res:any ) => {
      await Item.find({recommended:"true"}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
       }
       
 
       
 export  const topFeaturedSlide = async (req:any, res:any ) => {

    await Item.find({topfeatured:"true", status:"New" }).sort({ _id: -1 }).limit(4).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
     }
 
     export  const topFeaturedGallery = async (req:any, res:any ) => {
      await Item.find({topfeatured:"true"}).limit(6).then((items: any) =>  res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
       }
   
       export  const flashDeals = async (req:any, res:any ) => {

        await Item.find({status:"New",}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
         }
    
         export  const clearance = async (req:any, res:any ) => {

          await Item.find({discount:{ $gt: 1, $lt: 20 }}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
           }
      

  export  const topDeals = async (req:any, res:any ) => {

        await Item.find({topdeals:"true",}).limit(2).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
         }
    
         export const  relatedItem = async (req:any, res:any ) => {
          try{
            const item =  await Item.find({category:req.params.id})
           console.log(item)
           if (item){
             console.log(item)
            res.json({success:true, message:"categories sorted!", item:item})
           }
           }catch (err){
             res.json({success:false, message:"No categories!"})
           }
        };
      

       
              export  const addViewedItem = async (req:any, res:any ) => {
                const {itemId} = req.body
                const owner = req.user?.id
              
                try{
                  const viewed = await View.findOne({owner:owner})
                  const  newitem = await Item.findOne({_id:itemId})
                  if (!owner) {
                    res.json({success:false, message:"No user found!"})
                  }else{
                    if (viewed){
                      const filter = {owner: owner }
                      const update = {$addToSet:{items : newitem }}
                       const doc = await View.findOneAndUpdate(filter, update, 
                        {new:true, upsert:true,  includeResultMetadata: true})
                        doc.save
                      res.json({ success: true, message: "Item added to View List!" });
                      
                    }else{
                       await View.create({
                        owner,
                        items:[newitem]
                    });
         
                res.json({success:true, message:"viewed List created!"})
                }
                  }
            
                  

            }catch (err){
     console.log(err)
            }
           }
      
  
           
           export const getViewedItems = async (req:any, res:any ) => {
            const owner  = req.user?.id
            const  view = await View.findOne({owner:owner})
            try{
            if (!owner) {
              res.json({success:false, message:"No User found"})
            }else{
                 if(view ){
                 
                   res.json({ success: true, message: "Recently viewed!", view:view});
                 }
                 else{
                   res.json({ success: false, message: "No recentely viewed!" });
                 }
            
            }
          }
          catch(err){
              console.log(err);
              res.status(500).send("Something went wrong");
          }
        }
