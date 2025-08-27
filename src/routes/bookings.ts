import { Router } from "express";
import { getBookings,getBookingStatuses } from "../controllers/bookings/bookingsController";
import { authMiddleware } from "../middlewares/auth_middleware";
const router = Router();

 router.get('/',authMiddleware,getBookings);
 router.get('/statuses',getBookingStatuses);


export default router;