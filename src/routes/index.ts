import { Router } from "express";
import usersRouter from "./users";
import authRouters from './auth';
 
const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouters);

export default router;