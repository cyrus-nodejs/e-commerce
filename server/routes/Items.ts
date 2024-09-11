
 import express from "express"
import { getItem, postItem, getItemDetails, getCategory,
trending, topFeaturedGallery, topFeaturedSlide, topDeals,
 searchItem, deleteItem,
updateItem, typeCategory, recommended,
addViewedItem, getViewedItems, relatedItem } from "../controllers/itemControllers";
 
import { upload } from "../utils/storage";
const router = express.Router();


router.get("/items", getItem);
router.get("/category/:id",  getCategory);
router.get("/category",  typeCategory);
router.get("/trending",  trending);
router.get("/recommended",  recommended);
router.get("/topfeaturedslide",  topFeaturedSlide);
router.get("/topfeaturedgallery",  topFeaturedGallery);
router.get("/topdeals",  topDeals);
router.get("/search",  searchItem);
router.get("/itemdetails/:id",  getItemDetails);
router.put("/items/:id",   updateItem);
router.delete("/items/:id",   deleteItem);
router.get("/getviewed",   getViewedItems);

router.post("/items", upload.single("image"), postItem);
router.post("/vieweditem",  addViewedItem  );
router.put("/othersviewed",   );
router.put("/relateditem",  relatedItem );





export default router;
