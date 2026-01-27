import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import {
  getCompaniesService,
  updateCompanyService,
} from "../../services/companies/companiesService";
import { Company } from "../../types/company";

export async function getCompanies(req: Request, res: Response) {
  try {
    const result = await getCompaniesService();
    res.json(successResponse(result, "success"));
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message, "error"));
  }
}

export async function updateCompany(req: Request, res: Response) {
  try {
    const data: Company = req.body;

    const result = await updateCompanyService(data);

    res.json(successResponse(result, "success"));
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message, "error"));
  }
}
