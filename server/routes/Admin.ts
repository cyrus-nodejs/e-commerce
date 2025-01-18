import express from 'express';

import {userAuthorization} from "../middlewares/jwt/verifyToken"
import {  AssignCustomerService,  AdminDashboard, AssignReseller, AssignAdmin } from '../controllers/adminControllers';
import { verifyRole } from '../middlewares/jwt/verifyToken';

const router = express.Router();



router.post("/addreseller", verifyRole(['customer service']), AssignReseller  );
router.post("/addcustomerservice", userAuthorization, verifyRole(['admin']), AssignCustomerService );
router.post("/addadmin", userAuthorization, verifyRole(['admin']), AssignAdmin);
router.get("/admindashboard", userAuthorization, verifyRole(['admin']), AdminDashboard );




export default router;