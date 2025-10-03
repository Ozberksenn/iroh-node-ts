import { Request, Response } from "express";
import { getBookingsService, getBookingStatusesService, insertBookingStatusService } from "../../services/bookings/bookingsService";
import { errorResponse, successResponse } from "../../utils/responseHandler";

export async function getBookings(req: Request, res: Response){
    try {
           const result = await getBookingsService();
           res.json(successResponse(result,'success'));
    } catch (err: any) {
           res.status(500).json(errorResponse(err.message, "error"));
    }
}

export async function getBookingStatuses(req: Request, res: Response){
    try {
           const result = await getBookingStatusesService();
           res.json(successResponse(result,'success'));
    } catch (err: any) {
           res.status(500).json(errorResponse(err.message, "error"));
    }
}

export async function insertBookingStatus(req: Request, res: Response) {
       try {
              const data: any = req.body;

              const result = await insertBookingStatusService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}