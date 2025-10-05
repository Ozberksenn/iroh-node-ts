import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { getBookingLogsService, insertBookingLogService, insertLogTypeService } from "../../services/bookings/bookingLogService";
import { BookingLog } from "../../types/booking";

export async function getBookingLogs(req: Request, res: Response){
    try {
           const result = await getBookingLogsService();
           res.json(successResponse(result,'success'));
    } catch (err: any) {
           res.status(500).json(errorResponse(err.message, "error"));
    }
}


export async function insertBookingLog(req: Request, res: Response) {
       try {
              const data: BookingLog = req.body;

              const result = await insertBookingLogService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function insertLogType(req: Request, res: Response) {
       try {
              const data: any = req.body;

              const result = await insertLogTypeService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}