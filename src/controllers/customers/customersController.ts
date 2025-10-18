import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/responseHandler";
import { deleteCustomerService, getCustomersService, insertCustomerService, updateCustomerService } from "../../services/customers/customersService";
import { Customer } from "../../types/customer";

export async function getCustomers(req: Request, res: Response) {
       try {
              const result = await getCustomersService();
              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}

export async function insertCustomer(req: Request, res: Response) {
       try {
              const data: Customer = req.body;

              const result = await insertCustomerService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}


export async function updateCustomer(req: Request, res: Response) {
       try {
              const data: Customer = req.body;

              const result = await updateCustomerService(data);

              res.json(successResponse(result, 'success'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}



export async function deleteCustomer(req: Request, res: Response) {
       try {
              const data: Customer = req.body;

              const result = await deleteCustomerService(data);

              res.json(successResponse(result, 'Success Delete Customer'));
       } catch (err: any) {
              res.status(500).json(errorResponse(err.message, "error"));
       }
}



