import { Router } from "express";
import usersRouter from "./users";
import authRouters from './auth';
import bookingsRouters from './bookings' 
import customersRouters from './customers'
import tablesRouters from './tables'
import companiesRouters from './companies'
import purchasesRouters from './purchases'
 
const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouters);
router.use('/', bookingsRouters);
router.use('/', customersRouters);
router.use('/', tablesRouters);
router.use('/', companiesRouters);
router.use('/', purchasesRouters);

export default router;