import { Request, Response } from "express";
import { getSubscribersService } from "../../services/subscribers/subscribersService";
import { errorResponse, successResponse } from "../../utils/responseHandler";

export async function getSubscribers(req: Request, res: Response){
    try {
           const result = await getSubscribersService();
           res.json(successResponse(result,'success'));
    } catch (err: any) {
           res.status(500).json(errorResponse(err.message, "error"));
    }
}