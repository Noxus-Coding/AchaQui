
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import type { Categoria } from "../types/profissional.types";

interface ProfissionaisFiltersProps {
  categorias: Categoria[];
  categoriaId: string;
  busca: string;
  carregando: boolean;
  erro: boolean;
  onSelecionarCategoria: (id: string) => void;
  onLimparFiltros: () => void;
}

export function ProfissionaisFilters({
  categorias,
  categoriaId,
  busca,
  carregando,
  erro,
  onSelecionarCategoria,
  onLimparFiltros,
}: ProfissionaisFiltersProps) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const nomeCategoria =
    categorias.find((categoria) => categoria.id === categoriaId)?.nome;

  const filtrosAtivos = Boolean(busca || categoriaId);

  function selecionar(id: string) {
    onSelecionarCategoria(id);
    setMostrarFiltros(false);
  }

  return (
    <div>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMostrarFiltros((anterior) => !anterior)}
          aria-expanded={mostrarFiltros}
          className="flex w-full items-center justify-between rounded-xl border border-achaqui-border bg-white px-4 py-4 text-sm font-semibold text-achaqui-green"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={17} />
            {nomeCategoria ?? "Filtrar por categoria"}
          </span>

          <span className="text-xs">
            {mostrarFiltros ? "Fechar" : "Abrir"}
          </span>
        </button>
      </div>

      <div
        className={`${
          mostrarFiltros ? "mt-4 flex" : "hidden"
        } flex-col flex-wrap gap-2 md:flex md:flex-row`}
      >
        <button
          type="button"
          onClick={() => selecionar("")}
          className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
            !categoriaId
              ? "border-achaqui-green bg-achaqui-green text-white"
              : "border-achaqui-border bg-white text-achaqui-muted hover:border-achaqui-green"
          }`}
        >
          Todas as categorias
        </button>

        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => selecionar(categoria.id)}
            className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
              categoriaId === categoria.id
                ? "border-achaqui-green bg-achaqui-green text-white"
                : "border-achaqui-border bg-white text-achaqui-muted hover:border-achaqui-green"
            }`}
          >
            {categoria.nome}
          </button>
        ))}
      </div>

      {carregando && (
        <p role="status" className="mt-3 text-xs text-achaqui-muted">
          Carregando categorias...
        </p>
      )}

      {erro && (
        <p role="alert" className="mt-3 text-xs text-red-600">
          Não foi possível carregar as categorias.
        </p>
      )}

      {filtrosAtivos && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-xs text-achaqui-muted">
            Filtros aplicados:
          </span>

          {busca && (
            <span className="rounded-full bg-[#E8F0EA] px-3 py-1 text-xs text-achaqui-green">
              Busca: {busca}
            </span>
          )}

          {categoriaId && (
            <span className="rounded-full bg-[#E8F0EA] px-3 py-1 text-xs text-achaqui-green">
              {nomeCategoria ?? "Categoria selecionada"}
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              onLimparFiltros();
              setMostrarFiltros(false);
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-achaqui-green hover:underline"
          >
            <X size={14} />
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
