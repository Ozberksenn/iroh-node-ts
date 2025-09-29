import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getCustomers } from "../controllers/customers/customersController";
const router = Router();

 router.get('/',authMiddleware,getCustomers);


export default router;