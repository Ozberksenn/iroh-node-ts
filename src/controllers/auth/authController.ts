import { Request, Response } from "express";
import { successResponse,errorResponse } from "../../utils/responseHandler";
import { loginService,createUserService,refreshTokenService, updatePasswordService } from "../../services/auth/authService";

export async function login(req: Request, res: Response) {
    try {
        await loginService(req,res);
        // res.json(successResponse(result,'success'))
    } catch (err: any) {
        res.status(500).json(errorResponse(err.message, "error"));
    }
}

export async function refresh(req: Request, res: Response) {
    try {
        const refreshToken = req.cookies.refreshToken; 
        const result = await refreshTokenService(refreshToken);
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

export async function updatePassword(req: Request, res: Response) {
    try {
        const result = await updatePasswordService(req);
        res.json(successResponse(result,'success'))
    } catch (err: any) {
        res.status(500).json(errorResponse(err.message, "error"));
    }
}