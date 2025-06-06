import { Request, Response } from 'express';
import { Item} from "../models/Item";
import { Category } from "../models/Category";
import { RecentlyViewed } from "../models/RecentlyViewed";
import { IUser } from '../models/User';
import { IFile } from '../types/@types';

//Retrieve all items from database
  export const  getAllItems = async (req:Request,res:Response) => {
    await Item.find().sort({date:-1}).then((items: any) => res.json(items)).catch((err: string) => res.json("Error : " + err));
   }

   //Add Category to Databse
   export  const addCategory = async  (req:Request,res:Response) => {
    const {title} = req.body
  
      const image = req?.file?.path ;
      
    if (!image) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
   
     
       console.log(title, image)
       const newCategoryData = {
        title,
         image,
       }
        
      const newItem = new Category(newCategoryData)
      newItem.save().then(() => res.json({message:"Item saved to Database"}), res.status(200).json).catch((err: string) => res.json(err))
    }
      
   // Add items to database
 export  const addItem = async  (req:Request,res:Response) => {
 
const {title, description, category, price, discount, trending, quantity, recommended, topfeatured, topdeals } = req.body
     //Retrieve image cloudinary url
const image  = req?.file?.path 
      console.log(image)
  if (!image) {
    // No file was uploaded
    return res.status(400).json({ error: "No file uploaded" });
  }

 

   

try {

  //Create new Item
  const newItemData = {title,description,image,trending,category,recommended,topfeatured,topdeals,price,quantity,discount}
  const newItem = new Item(newItemData)
  
  if (!newItem) {
    return res.json({ message: 'Item not saved to database!' });
  }
  
  //Add item to Category schema
    const filter = {title: category }
    const update = {$addToSet:{item : newItem}}
    Category.findOneAndUpdate(filter, update, {new:true, upsert:true,  includeResultMetadata: true})
    newItem.save()
     
    res.status(200).json({success:true, message:"Item saved to database!", item:newItem})

} catch (error) {
 return res.status(500).json({ message: 'Server Error' });
}  
}
  

 //Retrieve  items by its Id
 export const  getItembyId = async (req:Request,res:Response) => {
      const {id} = req.params
      await Item.findById(id).then((item: any) => res.json(item)).catch((err: string) => res.json("Error : " + err));
     }
  

   // Update selected item
export const  updateItem = async (req:Request,res:Response) => {
  const {id} = req.params
  const  {items} = req.body
 
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, items, { new: true });
    
    if (!updatedItem) {
      return res.json({sucesss:true, message: 'Item not found' });
    }

   return res.json({success:true, message:"Item updated successfully"});

  } catch (error) {

  console.log(error)
  return  res.json({ message: 'Server Error' });

  }
} 

//Remove selected item from database
export const deleteItem = async (req:Request,res:Response) => {

  const {itemId}= req.body
try{
  
  let item = await Item.findById(itemId);
  if (item){
    Item.findOneAndDelete({_id:itemId});
    res.json({ success: true, message: "Item removed from database" });
  }
   return res.json({ success: true, message: "No cart exists!" });


}catch (error) {
 console.log(error);
 return res.json({sucess:'false', message:"something went wrong1"})

}
}





// Search Items
export const searchItem = async (req:Request,res:Response) => {

const {query}= req.query
function escapeRegExp(input: any): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const safeQuery = escapeRegExp(query);
try {
  const regex = new RegExp(safeQuery, 'i'); // 'i' for case-insensitive
  
  const results = await Item.find({
    $or: [
      { title: { $regex: regex } },
      { description: { $regex: regex } }
    ]
  });

  res.json(results);
} catch (err) {
  console.error(err);
 return res.status(500).json({ error: 'Server error' });
}

}

//Get product categories
export const  categoryMenu = async (req:Request,res:Response) => {
 
 Category.find().sort({date:-1}).then((items: any) => res.json(items)).catch((err: string) => res.json("Error : " + err));

}

//get products by categories
export const getCategoryItems = async (req:Request,res:Response) => {
  const l = req.params.id
  console.log(l)
  try{

    const item =  await Item.find({category:req.params.id})
  
  if (item){

    console.log(item)
  return res.json({success:true, message:"categories sorted!", item:item})

  }
  }catch (err){

   return res.json({success:false, message:"No categories!"})

  }
 
 }

//Get product details
 export const getProductDetails = async (req:Request,res:Response) => {
   const user = req.user as IUser
 const userId = user._id
 
  // Save to recently viewed (or update timestamp)
  RecentlyViewed.findOneAndUpdate(
    { userId:userId, itemId: req.params.id },
    { viewedAt: new Date() },
    { upsert: true, new: true }
  );

  const product = await Item.findById(req.params.id);
 
  if (product) {

    const userHasReviewed = product.reviews.some((review: { user: { toString: () => any; }; }) => req.user && review.user.toString() === userId.toString());
    res.status(200).json({product, userHasReviewed}
    
    );
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
  }

  
  //Get trending products
  export const trending = async (req:Request,res:Response) => {
  
    Item.find({trending:"true"}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
    
  }
 
//Get recommended items
 export const recommended = async (req:Request,res:Response) => {
  
  Item.find({recommended:"true"}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
       
}
       
 
       // Get items in slide
 export  const topFeaturedSlide = async (req:Request,res:Response) => {

Item.find({topfeatured:"true" }).sort({ _id: -1 }).limit(4).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
    
  }
 
//Get gallery items
export  const topFeaturedGallery = async (req:Request,res:Response) => {
    
  Item.find({topfeatured:"true"}).limit(6).then((items: any) =>  res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
       
    }
   
      // Get flash deals
export  const flashDeals = async (req:Request,res:Response) => {
  //find({   date_added:{  $lt: Date.now() }})
Item.find().sort({ date_added: -1 }).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err)) 
      }
    
      //Get Clearance Deals
export  const clearance = async (req:Request,res:Response) => {

  Item.find({discount:{ $gt: 1, $lt: 20 }}).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
          
}
      

//Get Top deals
  export  const topDeals = async (req:Request,res:Response) => {

    await Item.find({topdeals:"true",}).limit(2).then((items: any) => res.json(items)).catch((err: string) => res.status(400).json("Error : " + err))
  
  }
    
//Get Related items
export const  relatedItem = async (req:Request,res:Response) => {
        
try{

  const product = await Item.findById(req.params.id);

const item = await Item.find({_id: { $ne: product._id }, category: product.category}).limit(8);
        
console.log(item)
          
if (!item){
return res.json({success:false, message:"No related Items found!"})
      
}
return res.json({success:true, message:"view related Items!", item:item})

}catch (err){
         console.log(err) 
  return  res.json({success:false, message:"Network error!"})
           
}
        
};
      

        
  
  
             //Get RecentlyViewed Items
export const RecentlyViewedItems = async (req:Request,res:Response) => {
 const user = req.user as IUser
 if (!user){
 return res.status(401).json({message: 'Nouser found' });
 }

 const userId = user._id


  try {
  const recent = await RecentlyViewed.find({ userId: userId }).sort({ viewedAt: -1 }).limit(8).populate('itemId'); // or manually populate desired fields
           
      return  res.json( {message:"view recently items", recentlyviewed:recent.map((entry: { itemId: any; }) => entry.itemId)});
  
 } catch (err) {
       console.log(err)       
 return res.status(500).json({ error: 'Failed to fetch recently viewed products' });
    
}}
