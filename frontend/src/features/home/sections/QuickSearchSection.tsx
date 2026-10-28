
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Wrench,
  HousePlug,
  Construction,
  Sparkles,
  Paintbrush,
  PaintRoller,
  Laptop,
  Sofa,
  BriefcaseBusiness,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { listarCategorias } from "../../profissionais/api/profissionais.api";
import type { Categoria } from "../../profissionais/types/profissional.types";

const iconesCategorias: Record<string, LucideIcon> = {
  Eletricista: HousePlug,
  Encanador: Wrench,
  Pedreiro: Construction,
  Diarista: Sparkles,
  Manicure: Paintbrush,
  Pintor: PaintRoller,
  "Técnico em informática": Laptop,
  "Montador de móveis": Sofa,
};

export function QuickSearchSection() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarCategorias() {
      try {
        const resultado = await listarCategorias();

        if (ativo) {
          setCategorias(resultado);
        }
      } catch {
        if (ativo) setErro(true);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarCategorias();

    return () => {
      ativo = false;
    };
  }, []);

  function buscarProfissionais(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const termo = busca.trim();

    navigate(
      termo
        ? `/profissionais?busca=${encodeURIComponent(termo)}`
        : "/profissionais"
    );
  }

  function selecionarCategoria(id: string) {
    navigate(`/profissionais?categoriaId=${encodeURIComponent(id)}`);
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-achaqui-green">
          Busca rápida
        </p>

        <h2 className="mt-3 text-3xl font-medium tracking-tight text-achaqui-text sm:text-4xl">
          Encontre quem pode ajudar
        </h2>

        <p className="mt-3 text-sm text-achaqui-muted">
          Pesquise pelo nome ou explore as categorias de profissionais.
        </p>

        <form
          onSubmit={buscarProfissionais}
          className="mt-7 flex flex-col gap-3 rounded-2xl border border-achaqui-border bg-achaqui-cream p-3 sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-3 px-3 py-2">
            <Search size={20} className="shrink-0 text-achaqui-green" />

            <input
              type="search"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Qual profissional ou serviço você procura?"
              aria-label="Buscar profissionais"
              className="min-w-0 flex-1 bg-transparent text-sm text-achaqui-text outline-none placeholder:text-achaqui-muted"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-achaqui-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-achaqui-dark"
          >
            Buscar profissionais
            <ArrowRight size={17} />
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-achaqui-text">
            Explore por categoria
          </h3>

          {carregando && (
            <p role="status" className="mt-5 text-sm text-achaqui-muted">
              Carregando categorias...
            </p>
          )}

          {erro && (
            <p role="alert" className="mt-5 text-sm text-red-600">
              Não foi possível carregar as categorias.
            </p>
          )}

          {!carregando && !erro && categorias.length === 0 && (
            <p className="mt-5 text-sm text-achaqui-muted">
              Nenhuma categoria disponível.
            </p>
          )}

          {!carregando && !erro && categorias.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {categorias.map((categoria) => {
                const Icon =
                  iconesCategorias[categoria.nome] ?? BriefcaseBusiness;

                return (
                  <button
                    key={categoria.id}
                    type="button"
                    onClick={() => selecionarCategoria(categoria.id)}
                    className="group flex min-h-20 items-center gap-3 rounded-xl border border-achaqui-border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-achaqui-green/50 hover:shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F0EA] text-achaqui-green">
                      <Icon size={20} />
                    </span>

                    <span className="text-sm font-medium text-achaqui-text group-hover:text-achaqui-green">
                      {categoria.nome}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
