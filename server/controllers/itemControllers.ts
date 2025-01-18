
import { Category, Item, View} from "../models/Item";
import { verifyRole } from "../middlewares/jwt/verifyToken";
//Retrieve all items from database
  export const  getAllItems = async (req:any, res:any ) => {
console.log(`My ${req.user}`)
    await Item.find().sort({date:-1}).then((items: any) => res.json(items)).catch((err: string) => res.json("Error : " + err));
    
   }

   // Add items to database
 export  const addItem = async  (req:any, res:any ) => {

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
  

 //Retrieve  items by its Id
 export const  getItembyId = async (req:any, res:any ) => {
      const {id} = req.params
      await Item.findById(id).then((item: any) => res.json(item)).catch((err: string) => res.json("Error : " + err));
     }
  

   // Update selected item
export const  updateItem = async (req:any, res:any ) => {
  const {id} = req.params
  const  {items} = req.body
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, items, { new: true });
    if (!updatedItem) {
      return res.json({sucesss:true, message: 'Item not found' });
    }
    console.log(updatedItem)
    res.json({success:true, message:"Item updated successfully"});
  } catch (error) {
    res.json({ message: 'Server Error', error });
  }
} 

//Remove selected item fro database
export const deleteItem = async (req:any, res:any ) => {
 
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
 res.json(400).send();
}
}





// Search Items
export const searchItem = async (req:any, res:any ) => {
const searchitem = req.query
await Item.find({ title: { $regex: `${searchitem}`, $options: "i" }}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))

}

//Get product categories
export const  typeCategory = async (req:any, res:any ) => {
 await Category.find().sort({date:-1}).then((items: any) => res.json(items)).catch((err: string) => res.json("Error : " + err));
}

//get products by categories
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

//Get product details
 export const getItemDetails = async (req:any, res:any ) => {
  await Item.find({title:req.params.id}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))

  }

  
  //Get trending products
  export const trending = async (req:any, res:any ) => {
    await Item.find({trending:"true"}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
     }
 
//Get recommended items
 export const recommended = async (req:any, res:any ) => {
      await Item.find({recommended:"true"}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
       }
       
 
       // Get items in slide
 export  const topFeaturedSlide = async (req:any, res:any ) => {

    await Item.find({topfeatured:"true", status:"New" }).sort({ _id: -1 }).limit(4).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
     }
 
     //Get gallery items
     export  const topFeaturedGallery = async (req:any, res:any ) => {
      await Item.find({topfeatured:"true"}).limit(6).then((items: any) =>  res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
       }
   
      // Get flash deals
       export  const flashDeals = async (req:any, res:any ) => {

        await Item.find({status:"New",}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
         }
    
         export  const clearance = async (req:any, res:any ) => {

          await Item.find({discount:{ $gt: 1, $lt: 20 }}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
           }
      

          //Get Top deals
  export  const topDeals = async (req:any, res:any ) => {

        await Item.find({topdeals:"true",}).limit(2).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
         }
    
            //Get Related items
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
      

        
       //Add items to viewed list
              export  const addViewedItem = async (req:any, res:any ) => {
                const {itemId} = req.body
                const owner = req.user?.id
              
                try{
                  const viewed = await View.findOne({owner:owner})
                  const  newitem = await Item.findOne({_id:itemId})
                 
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
                  
            
                  

            }catch (err){
     console.log(err)
            }
           }
      
  
             //Get Viewed Items
           export const getViewedItems = async (req:any, res:any ) => {
            const owner  = req.user?.id
            const  view = await View.findOne({owner:owner})
            try{
         
                 if(view ){
                 
                   res.json({ success: true, message: "Recently viewed!", view:view});
                 }
                 else{
                   res.json({ success: false, message: "No recentely viewed!" });
                 }
          }
          catch(err){
              console.log(err);
              res.status(500).send("Something went wrong");
          }
        }
