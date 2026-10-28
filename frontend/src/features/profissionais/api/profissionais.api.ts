import { api } from "../../../lib/axios";

import type {
  FiltrosProfissionais,
  ListagemProfissionaisResponse,
  DetalhesProfissionalResponse,
  Categoria,
} from "../types/profissional.types";

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