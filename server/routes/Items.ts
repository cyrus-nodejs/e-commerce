
 import express from "express"
import { getAllItems, addItem, getItemDetails, getCategory,
trending, topFeaturedGallery, topFeaturedSlide, topDeals,
 searchItem, deleteItem,getItembyId,
updateItem, typeCategory, recommended,
addViewedItem, getViewedItems, relatedItem, flashDeals, clearance } from "../controllers/itemControllers";
 import { userAuthorization } from "../middlewares/jwt/verifyToken";
 import { verifyRole } from "../middlewares/jwt/verifyToken";
import { upload } from "../utils/storage";
const router = express.Router();



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
router.get("/relateditem/:id",  relatedItem );

router.get("/getitem/:id",  getItembyId );
router.get("/allitems", getAllItems);


router.post("/add/item", userAuthorization, verifyRole(['customer service']), upload.single("image"), addItem);
router.post("/addviewed", userAuthorization,  addViewedItem  );



export default router;
