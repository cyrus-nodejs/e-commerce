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


router.get("/alladmins", userAuthorization, verifyRole(['admin']), AllAdmins );
router.get("/allcustomerservices", userAuthorization, verifyRole(['admin']), AllCustomerService);
router.get("/allcustomers", userAuthorization, verifyRole(['admin']), AllCustomers );
router.get("/allorders", userAuthorization, verifyRole(['admin']), AllOrders );
router.get("/allresellers", userAuthorization, verifyRole(['admin']), AllResellers );

//add , edit delete, product by admin(customer service)       'customer service'
router.post("/admin/add-item", userAuthorization, verifyRole(['customer service']), upload.single("image"), addItem);
router.post("/admin/add-category", userAuthorization, verifyRole(['customer service']), upload.single("image"), addCategory);
// router.post("/add/item", userAuthorization, verifyRole(['customer service']), upload.single("image"), addItem);
router.put("/admin/update-item/:id", userAuthorization, verifyRole(['customer service']), updateItem);
router.delete("/admin/delete-item/:id", userAuthorization, verifyRole(['customer service']),  deleteItem);









export default router;