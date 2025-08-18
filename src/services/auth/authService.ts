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
  // todo : burada .env içinden çek.
  const accessToken = jwt.sign(
        {mail:user.mail},
        '5dc64dd78d40d4137bbccf95621bd51aa44477c9d76aced2d2d1d2de540290537b9b778ec7e159d5289d6d55346d350f93f05717f8c2d46a1a263d4f65151758',
        // process.env.ACCESS_TOKEN_SECRET,
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