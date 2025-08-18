import { Request, Response } from "express";
import { fetchUsersFromDb } from "../../services/usersService";
import { successResponse,errorResponse } from "../../utils/responseHandler";

export async function getUsers(req: Request, res: Response) {
    try {
       const users = await fetchUsersFromDb();
       res.json(successResponse(users,'success'))
    } catch (err: any) {
        res.status(500).json(errorResponse(err.message, "error"));
    }
}