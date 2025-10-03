import { Router } from "express";
import usersRouter from "./users";
import authRouters from './auth';
import subscriberRouters from './subscriber';
import bookingsRouters from './bookings' 
import customersRouters from './customers'
import tablesRouters from './tables'
import companiesRouters from './companies'
import purchasesRouters from './purchases'
 
const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouters);
router.use('/', subscriberRouters);
router.use('/bookings', bookingsRouters);
router.use('/', customersRouters);
router.use('/', tablesRouters);
router.use('/companies', companiesRouters);
router.use('/purchases', purchasesRouters);

export default router;