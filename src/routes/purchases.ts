import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { deletePurchase, getPurchases, getPurchasesById, insertPurchase, updatePurchase } from "../controllers/purchases/purchasesController";

const router = Router();

router.get('/purchases', authMiddleware, getPurchases);
router.get('/purchase',authMiddleware, getPurchasesById);
router.post('/purchase-insert', authMiddleware, insertPurchase);
router.put('/purchase-update', authMiddleware, updatePurchase);
router.delete('/purchase-delete', authMiddleware, deletePurchase);


export default router;