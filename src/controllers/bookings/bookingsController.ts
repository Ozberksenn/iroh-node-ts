import { Request, Response } from "express";
import { getActiveBookingsService, getBookingsService, insertBookingService, updateBookingService } from "../../services/bookings/bookingsService";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { Booking } from "../../types/booking";

export async function getBookings(req: Request, res: Response) {
       try {
              const result = await getBookingsService();
              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function getActiveBookings(req: Request, res: Response) {
       try {
              const result = await getActiveBookingsService();
              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function insertBooking(req: Request, res: Response) {
       try {
              const data: Booking = req.body;

              const result = await insertBookingService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function updateBooking(req: Request, res: Response) {
       try {
              const data: Booking = req.body;

              const result = await updateBookingService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}


