import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { deletePurchaseService, getPurchaseByIdService, getPurchasesService, insertPurchaseService, updatePurchaseService } from "../../services/purchases/purchasesService";
import { Purchase } from "../../types/purchase";

export async function getPurchases(req: Request, res: Response) {
       try {
              const result = await getPurchasesService();
              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function getPurchasesById(req: Request, res: Response) {
       try {
              const id = req.query.id;
              const result = await getPurchaseByIdService(Number(id));
              res.json(successResponse(result, 'success'));
       } catch (err:any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function insertPurchase(req: Request, res: Response) {
       try {
              const data: Purchase = req.body;

              const result = await insertPurchaseService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function updatePurchase(req: Request, res: Response) {
       try {
              const data: Purchase = req.body;

              const result = await updatePurchaseService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function deletePurchase(req: Request, res: Response) {
       try {
              const data: Purchase = req.body;

              const result = await deletePurchaseService(data);

              res.json(successResponse(result, 'Success Deleted'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}