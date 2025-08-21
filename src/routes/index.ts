import { Router } from "express";
import usersRouter from "./users";
import authRouters from './auth';
import subscriberRouters from './subscriber';
import bookingsRouters from './bookings' 
 
const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouters);
router.use('/subscriber', subscriberRouters);
router.use('/bookings', bookingsRouters);

export default router;