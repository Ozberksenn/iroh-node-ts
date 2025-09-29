import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { getCustomersService } from "../../services/customers/customersService";

export async function getCustomers(req: Request, res: Response){
    try {
           const result = await getCustomersService();
           res.json(successResponse(result,'success'));
    } catch (err: any) {
           res.status(500).json(errorResponse(err.message, "error"));
    }
}