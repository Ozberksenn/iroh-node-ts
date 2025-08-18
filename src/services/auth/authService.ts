import { getDbPool } from "../../config/db";
import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';



export async function loginService(req: Request) {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("mail", req.body.mail)
    .execute("usp_Login");

  if (!result.recordset || result.recordset.length === 0) {
    return null;
  }
  const user = result.recordset[0]
  const isPasswordValid = await bcrypt.compare(req.body.password,user.password);
   if (!isPasswordValid) {
      return null;
  }
  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  const accessToken = jwt.sign(
        {mail:user.mail},
        secret,
        { expiresIn: '3d' }
    );
  return accessToken
}

export async function createUserService(req: Request){
  const pool = await getDbPool();
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const result = await pool
    .request()
    .input("name", req.body.name)
    .input("lastName", req.body.lastName)
    .input("mail", req.body.mail)
    .input("password", hashedPassword)
    .input("phone", req.body.phone)
    .execute("usp_CreateUser");
  return result.recordset
}