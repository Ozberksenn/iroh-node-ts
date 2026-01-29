import { Router } from "express";
import { login, signup, refresh } from "../controllers/auth/authController";

const router = Router();

const { AuthValidation } = require('../middlewares/auth_validation');

router.post('/login', AuthValidation.login, login);
router.post('/signup', AuthValidation.register,signup);
// router.post('/update-password', authMiddleware, updatePassword);
router.post('/refresh', refresh);

export default router;