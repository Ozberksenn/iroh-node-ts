import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getBookingLogs, insertBookingLog, updateBookingLog } from "../controllers/bookings/bookingLogController";
import { getBookings, insertBooking, updateBooking } from "../controllers/bookings/bookingsController";

const router = Router();

router.get('/bookings', authMiddleware, getBookings);
router.get('/booking-logs', getBookingLogs);
router.post('/booking-insert', insertBooking);
router.put('/booking-update', updateBooking);
router.post('/booking-log-insert', insertBookingLog);
router.put('/booking-log-update', updateBookingLog);

export default router;