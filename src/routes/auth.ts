import { Router } from "express";
import { login,signup,refresh } from "../controllers/auth/authController";

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/refresh', refresh);

export default router;