import express from 'express';

import {userAuthorization} from "../middlewares/jwt/verifyToken"
import {  AssignCustomerService,   AssignReseller, AssignAdmin,
    AllAdmins, AllCustomerService, AllOrders, AllResellers, AllCustomers
 } from '../controllers/Admin';
import { verifyRole } from '../middlewares/jwt/verifyToken';
import { upload } from "../utils/storage";
import { deleteItem, updateItem, addItem, addCategory } from '../controllers/Item';
const router = express.Router();


//assign roles to varying users  
router.post("/addreseller", verifyRole(['customer service']), AssignReseller  );
router.post("/addcustomerservice", userAuthorization, verifyRole(['admin']), AssignCustomerService );
router.post("/addadmin", userAuthorization, verifyRole(['admin']), AssignAdmin);
router.post("/admin/add-item", userAuthorization, verifyRole(['customer service']), upload.single("image"), addItem);
router.post("/admin/add-category", userAuthorization, verifyRole(['customer service']), upload.single("image"), addCategory);


router.get("/alladmins", userAuthorization,  AllAdmins );
router.get("/allcustomerservices", userAuthorization,  AllCustomerService);
router.get("/allcustomers", userAuthorization,  AllCustomers );
router.get("/allorders", userAuthorization,  AllOrders );
router.get("/allresellers", userAuthorization,  AllResellers );


router.put("/admin/update-item/:id", userAuthorization, verifyRole(['customer service']), updateItem);
router.delete("/admin/delete-item/:id", userAuthorization, verifyRole(['customer service']),  deleteItem);









export default router;