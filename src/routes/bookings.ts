import { Router } from "express";
import { getBookings, getBookingStatuses, insertBooking, insertBookingStatus, updateBooking, updateBookingStatus } from "../controllers/bookings/bookingsController";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getBookingLogs, insertBookingLog, insertLogType, updateBookingLog } from "../controllers/bookings/bookingLogController";
const router = Router();

router.get('/bookings', authMiddleware, getBookings);
router.get('/booking-statuses', getBookingStatuses);
router.get('/booking-logs', getBookingLogs);
router.post('/booking-insert', insertBooking);
router.put('/booking-update', updateBooking);
router.post('/booking-status-insert', insertBookingStatus);
router.put('/booking-status-update', updateBookingStatus);
router.post('/booking-log-insert', insertBookingLog);
router.put('/booking-log-update', updateBookingLog);
router.post('/log-type', insertLogType);


export default router;