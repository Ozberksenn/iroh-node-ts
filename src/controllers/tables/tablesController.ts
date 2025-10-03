import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { getTablesService, insertTableService } from "../../services/tables/tablesService";
import { Table } from "../../types/table";

export async function getTables(req: Request, res: Response) {
       try {
              const result = await getTablesService();
              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function insertTable(req: Request, res: Response) {
       try {
              const data: Table = req.body;

              const result = await insertTableService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}