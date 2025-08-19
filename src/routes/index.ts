import { Router } from "express";
import usersRouter from "./users";
import authRouters from './auth';
import subscriberRouters from './subscriber';
 
const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouters);
router.use('/subscriber', subscriberRouters);

export default router;