import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { PurchasePayment } from "../../types/pruchasePayment";
import { insertPurchasePaymentService } from "../../services/purchasePayment/purchasePaymentService";

export async function insertPurchasePayment(req: Request, res: Response) {
  try {
    const data: PurchasePayment = req.body;
    const result = await insertPurchasePaymentService(data);
    res.json(successResponse(result, "success"));
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message, "error"));
  }
}
