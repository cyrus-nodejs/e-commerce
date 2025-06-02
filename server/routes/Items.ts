
 import express from "express"
import { getAllItems, addItem, getProductDetails, 
trending, topFeaturedGallery, topFeaturedSlide, topDeals,
 searchItem,getItembyId,
 categoryMenu, getCategoryItems, recommended,
 RecentlyViewedItems, relatedItem, flashDeals, clearance } from "../controllers/Item";
 import { userAuthorization } from "../middlewares/jwt/verifyToken";
 import { verifyRole } from "../middlewares/jwt/verifyToken";
import { upload } from "../utils/storage";
const router = express.Router();



router.get("/category/:id",  getCategoryItems);
router.get("/category",  categoryMenu);
router.get("/trending",  trending);
router.get("/recommended",  recommended);
router.get("/topfeaturedslide",  topFeaturedSlide);


router.get("/topfeaturedgallery",  topFeaturedGallery);
router.get("/topdeals",  topDeals);
router.get("/search",  searchItem);
router.get("/itemdetails/:id",  getProductDetails);
router.get("/getviewed",   RecentlyViewedItems);


router.get("/flashdeals",   flashDeals);
router.get("/clearance",   clearance);
router.get("/relateditem/:id",  relatedItem );
router.get("/getitem/:id",  getItembyId );
router.get("/allitems", getAllItems);


router.post("/add/item", userAuthorization, verifyRole(['customer service']), upload.single("image"), addItem);




export default router;
