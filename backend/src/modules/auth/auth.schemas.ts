import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido").trim().toLowerCase(),
  senha: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export type RegisterDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  senha: z.string().min(1, "Senha obrigatória"),
});

export type LoginDTO = z.infer<typeof loginSchema>;