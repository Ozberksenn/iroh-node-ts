import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { getTablesService } from "../../services/tables/tablesService";

export async function getTables(req: Request, res: Response){
    try {
           const result = await getTablesService();
           res.json(successResponse(result,'success'));
    } catch (err: any) {
           res.status(500).json(errorResponse(err.message, "error"));
    }
}