import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { getPurchasesService } from "../../services/purchases/purchasesService";

export async function getPurchases(req: Request, res: Response){
    try {
           const result = await getPurchasesService();
           res.json(successResponse(result,'success'));
    } catch (err: any) {
           res.status(500).json(errorResponse(err.message, "error"));
    }
}