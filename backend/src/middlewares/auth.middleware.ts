import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface AuthPayload extends JwtPayload {
  sub: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authorization.slice(7);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: "Erro de configuração da autenticação" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"],
      issuer: "achaqui-api",
      audience: "achaqui-web",
    });

    if (
      typeof decoded === "string" ||
      typeof decoded.sub !== "string" ||
      !decoded.sub
    ) {
      res.status(401).json({ message: "Token inválido" });
      return;
    }

    res.locals.usuarioId = decoded.sub;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
}