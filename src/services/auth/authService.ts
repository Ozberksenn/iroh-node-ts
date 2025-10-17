import { getDbPool } from "../../config/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export async function loginService(req: Request, res: Response) {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("mail", req.body.mail)
    .execute("usp_Login");

  if (!result.recordset || result.recordset.length === 0) {
    return null;
  }
  const user = result.recordset[0]
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: "Kullanici bulunamadi" };
  }
  const access = process.env.ACCESS_TOKEN_SECRET as string;
  const accessToken = jwt.sign(
    { mail: user.mail },
    access,
    { expiresIn: '24h' }
  );
  const refresh = process.env.REFRESH_TOKEN_SECRET as string;
  const refreshToken = jwt.sign(
    { mail: user.mail },
    refresh
  );
  // Cookie’ye refresh token yaz
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,   // JS erişemez (XSS koruması)
    secure: true,     // sadece HTTPS
    sameSite: "strict", // CSRF koruması
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün
  });

  return { accessToken };
}

export async function refreshTokenService(refreshToken: string) {
  if (!refreshToken) {
    return null;
  }
  try {
    const refresh = process.env.REFRESH_TOKEN_SECRET as string;
    const user = jwt.verify(refreshToken, refresh) as any;
    const accessToken = jwt.sign(
      { mail: user.mail },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "24h" }
    );

    return { accessToken };
  } catch (err) {
    return null;
  }
}

export async function updatePasswordService(req: Request) {
  const pool = await getDbPool();
  const findMail = await pool
    .request()
    .input("mail", req.body.mail)
    .execute("usp_Login");

  if (!findMail.recordset || findMail.recordset.length === 0) {
    return null;
  }
  const user = findMail.recordset[0]
  const isPasswordValid = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!isPasswordValid) {
    return { success: false, message: "Parolalar Eslesmiyor." };
  } else {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    const result = await pool
      .request()
      .input("mail", req.body.mail)
      .input("newPassword", hashedPassword)
      .execute("usp_UpdatePassword");
    return result.recordset
  }

}

export async function createUserService(req: Request) {
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