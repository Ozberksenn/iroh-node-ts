import { Router } from "express";
import { getSubscribers } from "../controllers/subscribers/subscribersController";
import { authMiddleware } from "../middlewares/auth_middleware";
const router = Router();

 router.get('/',authMiddleware,getSubscribers);


export default router;