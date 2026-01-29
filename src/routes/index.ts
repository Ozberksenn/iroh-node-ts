import { Router } from "express";
import authRouters from './auth';
import customersRouters from './customers'
import tablesRouters from './tables'
import companiesRouters from './companies'
import purchasesRouters from './purchases'
import bookingsRouters from './bookings'
import purchasePayment from './purchasePayment'
 
const router = Router();

router.use('/', authRouters);
router.use('/', bookingsRouters);
router.use('/', customersRouters);
router.use('/', tablesRouters);
router.use('/', companiesRouters);
router.use('/', purchasesRouters);
router.use('/', purchasePayment);

export default router;