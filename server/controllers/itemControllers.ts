//@ts-nocheck
import mongoose from "mongoose";
import { Category, Item, View} from "../models/Item";
import { Request, Response} from "express";

export const  getItem = async (req:any, res:any ) => {
    await Item.find().sort({date:-1}).then(items => res.json(items)).catch(err => res.json("Error : " + err));
  };


 export  const postItem = async  (req:any, res:any ) => {

    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
const {title, description, category, price, discount, status,
  trending, quantity, recommended, topfeatured, topdeals } = req.body
   const image = req.file.filename
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
  

 

   
export const updateItem = (req:any, res:any ) => {
  Item.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(item){
      Item.findOne({_id: req.params.id}).then(function(item){
          res.json(item);
      });
  });

} 

export const deleteItem = (req:any, res:any ) => {
  Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
      res.json({sucess:true});
  })
}






export const searchItem = async (req:any, res:any ) => {
const searchitem = req.query
await Item.find({ title: { $regex: `${searchitem}`, $options: "i" }}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))

}


export const  typeCategory = async (req:any, res:any ) => {

 await Category.find().sort({date:-1}).then(items => res.json(items)).catch(err => res.json("Error : " + err));
 
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

  await Item.find({title:req.params.id}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
 
 
  }

  
  export const trending = async (req:any, res:any ) => {
    await Item.find({trending:"true"}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
     }
 

 export const recommended = async (req:any, res:any ) => {
      await Item.find({recommended:"true"}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
       }
       
 
       
 export  const topFeaturedSlide = async (req:any, res:any ) => {

    await Item.find({topfeatured:"true", status:"New" }).sort({ _id: -1 }).limit(4).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
     }
 
     export  const topFeaturedGallery = async (req:any, res:any ) => {

      await Item.find({topfeatured:"true"}).limit(6).then(items =>  res.json(items)).catch(err => res.status(400).json("Error : " + err))
       }
   
       export  const flashDeals = async (req:any, res:any ) => {

        await Item.find({status:"New",}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
         }
    
         export  const clearance = async (req:any, res:any ) => {

          await Item.find({discount:{ $gt: 1, $lt: 20 }}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
           }
      

  export  const topDeals = async (req:any, res:any ) => {

        await Item.find({topdeals:"true",}).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err))
         }
    
         export const  relatedItem = async (req:any, res:any ) => {
          const {category, itemId} = req.body
          console.log(category, itemId)
          try{
           const item = await Item.find({_id:{$ne:itemId}, category:category })
            if(item ){
             console.log(item)
             res.json({ success: true, message: "view related items!", item:item });
           }
           else{
             res.json({ success: false, message: "No related items!" });
           }
       
           
           }catch(err){
             console.log(err)
           }
        };
      

       
              export  const addViewedItem = async (req:any, res:any ) => {
                const {itemId, price, discount, image, title} = req.body
                const owner = req.user._id
              console.log(`my ${owner}, ${itemId}, ${price}, ${discount}, ${image}, ${title} `)
                try{
                  const viewed = await View.findOne({owner:owner})
  console.log(viewed)
                  if (viewed){
                    //  viewed.vieweditems.push({title, price, image, discount})
                    //  await  viewed.save()
                    const  newitem = {itemId, title, price, image, discount}
                    const filter = {owner: owner }
                    const update = {$addToSet:{items : newitem }}
                     const doc = await View.findOneAndUpdate(filter, update, 
                      {new:true, upsert:true,  includeResultMetadata: true})
                      doc.save
                    res.json({ success: true, message: "Item added to View List!" });
                    
                  }else{
                     await View.create({
                      owner,
                      items:[{itemId, title, image, price, discount}],
                  });
       
              res.json({success:true, message:"viewed List created!"})
              }

            }catch (err){
     console.log(err)
            }
           }
      
  
           
           export const getViewedItems = async (req:any, res:any ) => {
           
            const owner  = req.user._id
        
            try{
              console.log(owner)
               const  view = await View.findOne({owner:owner})
                if(view ){
                  console.log(`soc ${view}`)
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
