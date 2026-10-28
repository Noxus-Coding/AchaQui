
import { z } from "zod";

export const cadastroProfissionalSchema = z.object({
  nomeProfissional: z
    .string()
    .trim()
    .min(2, "Informe o nome profissional.")
    .max(120, "O nome deve ter no máximo 120 caracteres."),

  descricao: z
    .string()
    .trim()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),

  whatsapp: z
    .string()
    .trim()
    .regex(
      /^[0-9()\s+-]{10,20}$/,
      "Informe um número de WhatsApp válido."
    ),

  bairro: z
    .string()
    .trim()
    .min(2, "Informe seu bairro."),

  fotoUrl: z
    .union([z.url("Informe uma URL válida."), z.literal("")])
    .optional(),

  experiencia: z.string().trim().optional(),

  categoriaIds: z
    .array(z.uuid())
    .min(1, "Selecione pelo menos uma categoria."),
});

export type CadastroProfissionalFormData = z.infer<
  typeof cadastroProfissionalSchema
>;
