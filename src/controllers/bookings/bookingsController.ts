import { Request, Response } from "express";
import {
  getActiveBookingsService,
  getBookingsService,
  insertBookingService,
  updateBookingService,
} from "../../services/bookings/bookingsService";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { Booking } from "../../types/booking";

export async function getBookings(req: Request, res: Response) {
  const page = Number(req.query.page ?? 1);
  const size = Number(req.query.size ?? 20);
  const name = req.query.name as string | undefined;
  try {
    const result = await getBookingsService(page, size);

    return res.json(successResponse(result, "success"));
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message, "error"));
  }
}

export async function getActiveBookings(req: Request, res: Response) {
  try {
    const result = await getActiveBookingsService();
    res.json(successResponse(result, "success"));
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message, "error"));
  }
}

export async function insertBooking(req: Request, res: Response) {
  try {
    const data: Booking = req.body;

    const result = await insertBookingService(data);

    res.json(successResponse(result, "success"));
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message, "error"));
  }
}

export async function updateBooking(req: Request, res: Response) {
  try {
    const data: Booking = req.body;

    const result = await updateBookingService(data);

    res.json(successResponse(result, "success"));
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message, "error"));
  }
}
