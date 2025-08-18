import { Request, Response } from "express";
import { successResponse,errorResponse } from "../../utils/responseHandler";
import { loginService,createUserService } from "../../services/auth/authService";

export async function login(req: Request, res: Response) {
    try {
        const result = await loginService(req);
        res.json(successResponse(result,'success'))
    } catch (err: any) {
        res.status(500).json(errorResponse(err.message, "error"));
    }
}


export async function signup(req: Request, res: Response) {
    try {
        const result = await createUserService(req);
        res.json(successResponse(result,'success'))
    } catch (err: any) {
        res.status(500).json(errorResponse(err.message, "error"));
    }
}