import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getPurchases } from "../controllers/purchases/purchasesController";
const router = Router();

 router.get('/',authMiddleware,getPurchases);


export default router;