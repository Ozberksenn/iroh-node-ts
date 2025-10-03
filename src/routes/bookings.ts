import { Router } from "express";
import { getBookings, getBookingStatuses, insertBookingStatus } from "../controllers/bookings/bookingsController";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getBookingLogs, insertBookingLog } from "../controllers/bookings/bookingLogController";
const router = Router();

router.get('/bookings', authMiddleware, getBookings);
router.get('/booking-statuses', getBookingStatuses);
router.get('/booking-logs', getBookingLogs);
router.post('/booking-status-insert', insertBookingStatus);
router.post('/booking-log-insert', insertBookingLog);


export default router;