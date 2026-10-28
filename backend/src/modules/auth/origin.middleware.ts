
import type { Request, Response, NextFunction } from "express";

const origensPermitidas = new Set(
  (process.env.FRONTEND_URL ?? "http://localhost:5173")
    .split(",")
    .map((origem) => origem.trim())
    .filter(Boolean)
);

export function validarOrigem(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const origem = req.get("Origin");

  if (!origem || !origensPermitidas.has(origem)) {
    res.status(403).json({
      message: "Origem da requisição não permitida",
    });
    return;
  }

  next();
}
