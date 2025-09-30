import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { getCompaniesService } from "../../services/companies/companiesService";

export async function getCompanies(req: Request, res: Response){
    try {
           const result = await getCompaniesService();
           res.json(successResponse(result,'success'));
    } catch (err: any) {
           res.status(500).json(errorResponse(err.message, "error"));
    }
}