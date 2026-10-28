
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Paginacao } from "../types/profissional.types";

interface ProfissionaisPaginationProps {
  paginacao: Paginacao | null;
  onMudarPagina: (pagina: number) => void;
}

export function ProfissionaisPagination({
  paginacao,
  onMudarPagina,
}: ProfissionaisPaginationProps) {
  if (!paginacao || paginacao.total === 0) {
    return null;
  }

  const { pagina, limite, total, totalPaginas } = paginacao;

  const inicio = (pagina - 1) * limite + 1;
  const fim = Math.min(pagina * limite, total);

  return (
    <nav
      aria-label="Paginação de profissionais"
      className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-achaqui-border pt-7 sm:flex-row"
    >
      <p className="text-xs text-achaqui-muted">
        Exibindo {inicio}–{fim} de {total} profissionais
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={pagina <= 1}
          onClick={() => onMudarPagina(pagina - 1)}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-achaqui-border bg-white px-4 text-xs font-semibold text-achaqui-green disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft size={15} />
          Anterior
        </button>

        <span className="whitespace-nowrap text-xs text-achaqui-muted">
          Página {pagina} de {totalPaginas}
        </span>

        <button
          type="button"
          disabled={pagina >= totalPaginas}
          onClick={() => onMudarPagina(pagina + 1)}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-achaqui-border bg-white px-4 text-xs font-semibold text-achaqui-green disabled:cursor-not-allowed disabled:opacity-40"
        >
          Próxima
          <ArrowRight size={15} />
        </button>
      </div>
    </nav>
  );
}
