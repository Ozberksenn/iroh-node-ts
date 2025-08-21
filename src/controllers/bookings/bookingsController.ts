import { Request, Response } from "express";
import { getBookingsService } from "../../services/bookings/bookingsService";
import { errorResponse, successResponse } from "../../utils/responseHandler";

export async function getBookings(req: Request, res: Response){
    try {
           const result = await getBookingsService();
           res.json(successResponse(result,'success'));
    } catch (err: any) {
           res.status(500).json(errorResponse(err.message, "error"));
    }
}