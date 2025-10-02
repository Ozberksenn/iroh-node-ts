import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getCustomers, insertCustomer, } from "../controllers/customers/customersController";
const router = Router();

router.get('/customers',authMiddleware,getCustomers);
router.post('/customer-insert',authMiddleware,insertCustomer);


export default router;