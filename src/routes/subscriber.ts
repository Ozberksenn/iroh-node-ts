import { Router } from "express";
import { getSubscribers, insertSubscriber } from "../controllers/subscribers/subscribersController";
import { authMiddleware } from "../middlewares/auth_middleware";
const router = Router();

router.get('/subscribers', authMiddleware, getSubscribers);
router.post('/subscriber-insert', authMiddleware, insertSubscriber);


export default router;