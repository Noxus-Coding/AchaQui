
import { Search, X } from "lucide-react";

interface ProfissionaisSearchProps {
  valor: string;
  onChange: (valor: string) => void;
  onBuscar: () => void;
}

export function ProfissionaisSearch({
  valor,
  onChange,
  onBuscar,
}: ProfissionaisSearchProps) {
  return (
    <section className="bg-achaqui-cream">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-achaqui-green">
            Profissionais de Quixadá
          </p>

          <h1 className="mt-4 max-w-2xl text-4xl font-medium leading-[1.1] tracking-[-0.045em] sm:text-5xl">
            Encontre o profissional ideal
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-achaqui-muted sm:text-base">
            Encontre profissionais da sua cidade, conheça seus serviços
            e entre em contato diretamente pelo WhatsApp.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onBuscar();
            }}
            className="mt-8 flex flex-col gap-2 rounded-2xl border border-achaqui-border bg-white p-2 shadow-[0_8px_25px_rgba(45,42,38,0.07)] sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3">
              <Search
                size={20}
                className="shrink-0 text-achaqui-green"
              />

              <input
                type="search"
                value={valor}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Qual profissional ou serviço você procura?"
                aria-label="Pesquisar profissionais"
                className="min-w-0 flex-1 bg-transparent text-sm text-achaqui-text outline-none placeholder:text-achaqui-muted"
              />

              {valor && (
                <button
                  type="button"
                  onClick={() => onChange("")}
                  aria-label="Limpar campo de busca"
                  className="text-achaqui-muted hover:text-achaqui-text"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="min-h-12 rounded-xl bg-achaqui-green px-6 text-sm font-semibold text-white transition hover:bg-achaqui-dark"
            >
              Buscar profissionais
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
