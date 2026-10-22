import { z } from "zod";

export const registerSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(3, "Nome deve ter pelo menos 3 caracteres"),

    email: z
      .email("Informe um e-mail válido")
      .trim()
      .toLowerCase(),

    senha: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres"),

    confirmarSenha: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;