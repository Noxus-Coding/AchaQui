import { api } from "../../../lib/axios";
import axios from "axios";
import type {
  FiltrosProfissionais,
  ListagemProfissionaisResponse,
  DetalhesProfissionalResponse,
  Categoria,
} from "../types/profissional.types";

import type { Profissional } from "../types/profissional.types";
import type { CadastroProfissionalFormData } from "../schemas/cadastro-profissional.schema";

export async function listarProfissionais(
  filtros: FiltrosProfissionais = {}
): Promise<ListagemProfissionaisResponse> {
  const { data } = await api.get<ListagemProfissionaisResponse>(
    "/profissionais",
    {
      params: filtros,
    }
  );

  return data;
}

export async function buscarProfissionalPorId(
  id: string
): Promise<DetalhesProfissionalResponse> {
  const { data } = await api.get<DetalhesProfissionalResponse>(
    `/profissionais/${encodeURIComponent(id)}`
  );

  return data;
}

export async function listarCategorias(): Promise<Categoria[]> {
  const { data } = await api.get<Categoria[]>("/categorias");

  return data;
}

export async function buscarMeuPerfilProfissional(): Promise<Profissional | null> {
  try {
    const { data } = await api.get<{ perfil: Profissional }>(
      "/profissionais/me"
    );

    return data.perfil;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 404
    ) {
      return null;
    }

    throw error;
  }
}

export async function criarPerfilProfissional(
  dados: CadastroProfissionalFormData
): Promise<Profissional> {
  const { data } = await api.post<{ perfil: Profissional }>(
    "/profissionais",
    {
      ...dados,
      fotoUrl: dados.fotoUrl || undefined,
      experiencia: dados.experiencia || undefined,
    }
  );

  return data.perfil;
}


export async function atualizarMeuPerfilProfissional(
  dados: CadastroProfissionalFormData
): Promise<Profissional> {
  const { data } = await api.patch<{ perfil: Profissional }>(
    "/profissionais/me",
    {
      ...dados,
      fotoUrl: dados.fotoUrl || null,
      experiencia: dados.experiencia || null,
    }
  );

  return data.perfil;
}

