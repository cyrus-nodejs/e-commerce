
import { Item} from "../models/Item";
import { Category } from "../models/Category";
import { View } from "../models/Viewed";
import { verifyRole } from "../middlewares/jwt/verifyToken";
//Retrieve all items from database
  export const  getAllItems = async (req:any, res:any ) => {
console.log(`My ${req.user}`)
    await Item.find().sort({date:-1}).then((items: any) => res.json(items)).catch((err: string) => res.json("Error : " + err));
    
   }

   //Add Category to Databse
   export  const addCategory = async  (req:any, res:any ) => {
    const {title} = req.body
      console.log(req.body)
      if (!req.file) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
    
      const image = req.file.path
       console.log(title, image)
       const newCategoryData = {
        title,
         image,
       }
        const newItem = new Category(newCategoryData)
      
      newItem.save()
      .then(() => res.json({message:"Item saved to Database"}), res.status(200).json)
        .catch((err: string) => res.json(err))
       }
      
   // Add items to database
 export  const addItem = async  (req:any, res:any ) => {
  console.log(req.body)
const {title, description, category, price, discount, 
  trending, quantity, recommended, topfeatured, topdeals } = req.body

  if (!req.file) {
    // No file was uploaded
    return res.status(400).json({ error: "No file uploaded" });
  }

  //Retrieve image cloudinary url
  const image = req.file.path
   

try {
  //Create new Item
  const newItemData = {
    title,
    description,
     image,
       trending,
       category,
       recommended,
       topfeatured,
       topdeals,
     price,
     quantity,
     discount,
   
  }
  const newItem = new Item(newItemData)
  if (!newItem) {
    return res.json({ message: 'Item not saved to database!' });
  }
  
  //Add item to Category schema
    const filter = {title: category }
    const update = {$addToSet:{item : newItem}}
     const doc = await Category.findOneAndUpdate(filter, update, {new:true, upsert:true,  includeResultMetadata: true})
      newItem.save()
     
      res.status(200).json({success:true, message:"Item saved to database!", item:newItem})

} catch (error) {
  res.json({ message: 'Server Error', error });
}  
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

//Remove selected item from database
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

const {query}= req.query

// await Item.find({ title: { $regex: `${searchitem}`, $options: "i" }}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))

try {
  const regex = new RegExp(query, 'i'); // 'i' for case-insensitive
  const results = await Item.find({
    $or: [
      { title: { $regex: regex } },
      { description: { $regex: regex } }
    ]
  });

  res.json(results);
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
}

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

    await Item.find({topfeatured:"true" }).sort({ _id: -1 }).limit(4).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
     }
 
     //Get gallery items
     export  const topFeaturedGallery = async (req:any, res:any ) => {
      await Item.find({topfeatured:"true"}).limit(6).then((items: any) =>  res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
       }
   
      // Get flash deals
       export  const flashDeals = async (req:any, res:any ) => {
       
        //find({   date_added:{  $lt: Date.now() }})
        await Item.find().sort({ date_added: -1 }).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
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
