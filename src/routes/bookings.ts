import { Router } from "express";
import { getBookings } from "../controllers/bookings/bookingsController";

const router = Router();

 router.get('/', getBookings);


export default router;