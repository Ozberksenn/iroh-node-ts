import { pool } from "../../config/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function loginService(req: Request, res: Response) {
  const { mail, password } = req.body;

  const { rows } = await pool.query("SELECT * FROM fn_login($1)", [mail]);

  if (!rows || rows.length === 0) {
    return res.status(401).json({
      success: false,
      message: "Kullanıcı Bulunamadı",
    });
  }

  const user = rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Şifre Hatalı",
    });
  }

  const accessToken = jwt.sign(
    { id: user.id, mail: user.mail },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "24h" },
  );

  const refreshToken = jwt.sign(
    { id: user.id, mail: user.mail },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    data: {
      accessToken,
      refreshToken,
      expiresIn: 24 * 60 * 60,
      refreshExpiresIn: 7 * 24 * 60 * 60,
    },
  });
}

export async function refreshTokenService(refreshToken: string) {
  if (!refreshToken) {
    return null;
  }
  try {
    const refresh = process.env.REFRESH_TOKEN_SECRET as string;
    const user = jwt.verify(refreshToken, refresh) as any;
    const accessToken = jwt.sign(
      { mail: user.mail, id: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "24h" },
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: 24 * 60 * 60,
      refreshExpiresIn: 7 * 24 * 60 * 60,
    };
  } catch (err) {
    return null;
  }
}

// todo : açılacak
export async function updatePasswordService(req: Request) {
  // const pool = await getDbPool();
  // const findMail = await pool
  //   .request()
  //   .input("mail", req.body.mail)
  //   .execute("usp_Login");
  // if (!findMail.recordset || findMail.recordset.length === 0) {
  //   return null;
  // }
  // const user = findMail.recordset[0];
  // const isPasswordValid = await bcrypt.compare(
  //   req.body.oldPassword,
  //   user.password,
  // );
  // if (!isPasswordValid) {
  //   return { success: false, message: "Parolalar Eslesmiyor." };
  // } else {
  //   const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
  //   const result = await pool
  //     .request()
  //     .input("mail", req.body.mail)
  //     .input("newPassword", hashedPassword)
  //     .execute("usp_UpdatePassword");
  //   return result.recordset;
}

// todo : açılacak
export async function createUserService(req: Request) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await pool.query(`CALL usp_create_user($1, $2, $3, $4, $5)`, [
    req.body.name,
    req.body.mail,
    hashedPassword,
    req.body.phone ?? "",
    req.body.lastName ?? "",
  ]);

  return { success: true };
}
