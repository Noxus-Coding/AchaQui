import { z } from "zod";

export const criarPerfilProfissionalSchema = z.object({
  nomeProfissional: z.string().trim().min(3).max(100),
  descricao: z.string().trim().min(10).max(1000),
  whatsapp: z.string().trim().min(10).max(15),
  bairro: z.string().trim().min(2).max(100),

  fotoUrl: z.url().optional(),
  experiencia: z.string().trim().max(500).optional(),

  categoriaIds: z
    .array(z.uuid())
    .min(1, "Selecione pelo menos uma categoria.")
    .refine((ids) => new Set(ids).size === ids.length, {
      message: "Não é permitido repetir categorias.",
    }),
});

export type CriarPerfilProfissionalInput = z.infer<
  typeof criarPerfilProfissionalSchema
>;

export const atualizarPerfilProfissionalSchema =
  criarPerfilProfissionalSchema
    .partial()
    .refine((dados) => Object.keys(dados).length > 0, {
      message: "Informe pelo menos um campo para atualização.",
    });

export type AtualizarPerfilProfissionalInput = z.infer<
  typeof atualizarPerfilProfissionalSchema
>;