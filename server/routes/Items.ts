
 import express from "express"
import { getAllItems, postItem, getItemDetails, getCategory,
trending, topFeaturedGallery, topFeaturedSlide, topDeals,
 searchItem, deleteItem,
updateItem, typeCategory, recommended,
addViewedItem, getViewedItems, relatedItem, flashDeals, clearance } from "../controllers/itemControllers";
 
import { upload } from "../utils/storage";
const router = express.Router();


router.get("/allitems", getAllItems);
router.get("/category/:id",  getCategory);
router.get("/category",  typeCategory);
router.get("/trending",  trending);
router.get("/recommended",  recommended);
router.get("/topfeaturedslide",  topFeaturedSlide);
router.get("/topfeaturedgallery",  topFeaturedGallery);
router.get("/topdeals",  topDeals);
router.get("/search",  searchItem);
router.get("/itemdetails/:id",  getItemDetails);
 router.get("/getviewed",   getViewedItems);
router.get("/flashdeals",   flashDeals);
router.get("/clearance",   clearance);

router.post("/items", upload.single("image"), postItem);
router.post("/vieweditem",  addViewedItem  );
router.put("/relateditem",  relatedItem );
router.put("/items/:id",   updateItem);
router.delete("/items/:id",   deleteItem);




export default router;
