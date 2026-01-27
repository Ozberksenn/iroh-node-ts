import { Router } from "express";
import { login,signup,refresh, updatePassword } from "../controllers/auth/authController";
import { authMiddleware } from "../middlewares/auth_middleware";

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
// router.post('/update-password', authMiddleware, updatePassword);
router.post('/refresh', refresh);

export default router;