
import { Search } from "lucide-react";

import type { Profissional } from "../types/profissional.types";
import { ProfissionalCard } from "./ProfissionalCard";

interface ProfissionaisListProps {
  profissionais: Profissional[];
  carregando: boolean;
  erro: string;
  total: number;
  filtrosAtivos: boolean;
  onLimparFiltros: () => void;
  onTentarNovamente: () => void;
}

export function ProfissionaisList({
  profissionais,
  carregando,
  erro,
  total,
  filtrosAtivos,
  onLimparFiltros,
  onTentarNovamente,
}: ProfissionaisListProps) {
  return (
    <section className="mt-8 border-t border-achaqui-border pt-8">
      <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
        Profissionais disponíveis
      </h2>

      <p className="mt-2 text-sm text-achaqui-muted">
        {carregando
          ? "Buscando profissionais..."
          : erro
            ? "Não foi possível consultar os resultados."
            : `${total} ${
                total === 1
                  ? "profissional encontrado"
                  : "profissionais encontrados"
              }`}
      </p>

      {carregando && (
        <div
          role="status"
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-2xl border border-achaqui-border bg-white"
            >
              <div className="h-52 bg-gray-100" />

              <div className="space-y-4 p-5">
                <div className="h-4 w-24 rounded bg-gray-100" />
                <div className="h-6 w-2/3 rounded bg-gray-100" />
                <div className="h-4 w-1/2 rounded bg-gray-100" />
                <div className="h-14 rounded bg-gray-100" />
              </div>
            </div>
          ))}

          <span className="sr-only">
            Carregando profissionais...
          </span>
        </div>
      )}

      {!carregando && erro && (
        <div
          role="alert"
          className="mt-8 rounded-2xl border border-red-100 bg-white p-10 text-center"
        >
          <p className="font-semibold">
            Não foi possível carregar os resultados.
          </p>

          <p className="mt-2 text-sm text-achaqui-muted">
            {erro}
          </p>

          <button
            type="button"
            onClick={onTentarNovamente}
            className="mt-5 rounded-xl bg-achaqui-green px-5 py-3 text-sm font-semibold text-white"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && profissionais.length === 0 && (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-achaqui-border bg-white px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F0EA]">
            <Search size={28} className="text-achaqui-green" />
          </div>

          <h3 className="mt-5 text-xl font-semibold">
            Nenhum profissional encontrado
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-6 text-achaqui-muted">
            Tente outro nome ou uma categoria diferente.
          </p>

          {filtrosAtivos && (
            <button
              type="button"
              onClick={onLimparFiltros}
              className="mt-6 rounded-xl bg-achaqui-green px-5 py-3 text-sm font-semibold text-white"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {!carregando && !erro && profissionais.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profissionais.map((profissional) => (
            <ProfissionalCard
              key={profissional.id}
              profissional={profissional}
            />
          ))}
        </div>
      )}
    </section>
  );
}
