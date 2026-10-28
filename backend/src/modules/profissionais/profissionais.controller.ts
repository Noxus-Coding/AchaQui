import type { Request, Response } from "express";
import { ZodError } from "zod";
import { z } from "zod";

import { 
  criarPerfilProfissionalSchema,
  atualizarPerfilProfissionalSchema,
 } from "./profissionais.schema.js";
import {
  criarPerfilProfissional,
  PerfilProfissionalError,
  atualizarPerfilProfissional,
  listarProfissionais ,
  buscarMeuPerfilProfissional,
  buscarProfissionalPorId,
} from "./profissionais.service.js";

export async function criarPerfilProfissionalController(
  req: Request,
  res: Response
) {
  try {
    const usuarioId = res.locals.usuarioId as string | undefined;

    if (!usuarioId) {
      return res.status(401).json({
        mensagem: "Usuário não autenticado.",
      });
    }

    const dados = criarPerfilProfissionalSchema.parse(req.body);

    const perfil = await criarPerfilProfissional(usuarioId, dados);

    return res.status(201).json({
      mensagem: "Perfil profissional cadastrado com sucesso.",
      perfil,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        mensagem: "Dados inválidos.",
        erros: error.issues,
      });
    }

    if (error instanceof PerfilProfissionalError) {
      return res.status(error.statusCode).json({
        mensagem: error.message,
      });
    }

    console.error("Erro ao cadastrar perfil profissional:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao cadastrar perfil profissional.",
    });
  }
}

export async function buscarMeuPerfilProfissionalController(
  _req: Request,
  res: Response
) {
  try {
    const usuarioId = res.locals.usuarioId as string | undefined;

    if (!usuarioId) {
      return res.status(401).json({
        mensagem: "Usuário não autenticado.",
      });
    }

    const perfil = await buscarMeuPerfilProfissional(usuarioId);

    if (!perfil) {
      return res.status(404).json({
        mensagem: "Perfil profissional não encontrado.",
      });
    }

    return res.status(200).json({ perfil });
  } catch (error) {
    console.error("Erro ao buscar perfil profissional:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao buscar perfil profissional.",
    });
  }
}

export async function atualizarPerfilProfissionalController(
  req: Request,
  res: Response
) {
  try {
    const usuarioId = res.locals.usuarioId as string | undefined;

    if (!usuarioId) {
      return res.status(401).json({
        mensagem: "Usuário não autenticado.",
      });
    }

    const dados = atualizarPerfilProfissionalSchema.parse(req.body);

    const perfil = await atualizarPerfilProfissional(usuarioId, dados);

    return res.status(200).json({
      mensagem: "Perfil profissional atualizado com sucesso.",
      perfil,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        mensagem: "Dados inválidos.",
        erros: error.issues,
      });
    }

    if (error instanceof PerfilProfissionalError) {
      return res.status(error.statusCode).json({
        mensagem: error.message,
      });
    }

    console.error("Erro ao atualizar perfil profissional:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao atualizar perfil profissional.",
    });
  }
}

export async function listarProfissionaisController(
  req: Request,
  res: Response
) {
  const filtrosSchema = z.object({
    busca: z.string().trim().max(100).optional(),
    categoriaId: z.uuid().optional(),
    pagina: z.coerce.number().int().min(1).default(1),
    limite: z.coerce.number().int().min(1).max(50).default(10),
  });

  const validacao = filtrosSchema.safeParse(req.query);

  if (!validacao.success) {
    return res.status(400).json({
      mensagem: "Filtros inválidos.",
      erros: validacao.error.issues,
    });
  }

  try {
    const resultado = await listarProfissionais(validacao.data);

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao listar profissionais:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao listar profissionais.",
    });
  }
}

export async function buscarProfissionalPorIdController(
  req: Request,
  res: Response
) {
  const validacao = z.uuid().safeParse(req.params.id);

  if (!validacao.success) {
    return res.status(400).json({
      mensagem: "ID do profissional inválido.",
    });
  }

  try {
    const profissional = await buscarProfissionalPorId(validacao.data);

    if (!profissional) {
      return res.status(404).json({
        mensagem: "Profissional não encontrado.",
      });
    }

    return res.status(200).json({ profissional });
  } catch (error) {
    console.error("Erro ao buscar profissional:", error);

    return res.status(500).json({
      mensagem: "Erro interno ao buscar profissional.",
    });
  }
}