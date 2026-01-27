import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { insertPurchasePayment } from "../controllers/purchasePayment/purchasePaymentController";
const router = Router();

router.post("/purchasePayment", authMiddleware, insertPurchasePayment);

export default router;
