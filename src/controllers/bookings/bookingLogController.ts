import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { insertBookingLogService } from "../../services/bookings/bookingLogsService";
import { BookingLog } from "../../types/booking";

export async function insertBookingLog(req: Request, res: Response) {
       try {
              const data: BookingLog = req.body;

              const result = await insertBookingLogService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}