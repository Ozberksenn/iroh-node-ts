import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getPurchaseBookingsById } from "../controllers/purchaseBookings/purchaseBookingsController";
import {
  deletePurchase,
  getPurchases,
  getPurchasesByCustomerId,
  insertPurchase,
  updatePurchase,
} from "../controllers/purchases/purchasesController";

const router = Router();

router.get("/purchases", authMiddleware, getPurchases);
router.get("/purchase", authMiddleware, getPurchasesByCustomerId);
router.post("/purchase-insert", authMiddleware, insertPurchase);
router.put("/purchase-update", authMiddleware, updatePurchase);
router.delete("/purchase-delete", authMiddleware, deletePurchase);

// purchaseBookings
router.get("/purchaseBookingsById", authMiddleware, getPurchaseBookingsById);

export default router;
