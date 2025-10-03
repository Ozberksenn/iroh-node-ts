import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getPurchases, insertPurchase } from "../controllers/purchases/purchasesController";
const router = Router();

 router.get('/purchases',authMiddleware,getPurchases);
 router.post('/purchase-insert',authMiddleware,insertPurchase);


export default router;