
import type { CookieOptions, Response } from "express";

export const REFRESH_TOKEN_COOKIE = "achaqui_refresh_token";

const SETE_DIAS_EM_MS = 7 * 24 * 60 * 60 * 1000;

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth",
  maxAge: SETE_DIAS_EM_MS,
};

export function definirCookieRefreshToken(
  res: Response,
  token: string
): void {
  res.cookie(REFRESH_TOKEN_COOKIE, token, cookieOptions);
}

export function removerCookieRefreshToken(res: Response): void {
  res.clearCookie(REFRESH_TOKEN_COOKIE, {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
  });
}
