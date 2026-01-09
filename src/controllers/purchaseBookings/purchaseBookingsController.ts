import { Request, Response } from "express";
import { getPurchaseBookingsByIdService } from "../../services/purchaseBookings/purchaseBookingsService";
import { errorResponse, successResponse } from "../../utils/responseHandler";

export async function getPurchaseBookingsById(req: Request, res: Response) {
  try {
    const purchaseId = Number(req.query.purchaseId);
    const result = await getPurchaseBookingsByIdService(purchaseId);
    res.json(successResponse(result, "success"));
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message, "error"));
  }
}
