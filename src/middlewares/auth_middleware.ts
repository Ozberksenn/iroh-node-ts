import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'


export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
      const token = req.headers['authorization']?.split(' ')[1]
      if(!token) return res.status(401).json({message:'You must be log in'});
       jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string,(err,value) => {
            if(err){
                return res.status(400).json(err);
            }
            // console.log(value)
            next();
        })
}