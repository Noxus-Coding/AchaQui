
import { useEffect, useState } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  MessageCircle,
  Search,
  Send,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";

import { AppHeader } from "../../../components/layout/AppHeader";
import { Footer } from "../../landing/sections/LandingExtras";

import {
  listarCategorias,
  listarProfissionais,
} from "../api/profissionais.api";

import type {
  Categoria,
  Paginacao,
  Profissional,
} from "../types/profissional.types";

const LIMITE = 6;

function criarLinkWhatsapp(whatsapp: string) {
  const numero = whatsapp.replace(/\D/g, "");

  const numeroCompleto =
    numero.length === 10 || numero.length === 11
      ? `55${numero}`
      : numero;

  if (
    !/^55\d{10,11}$/.test(numeroCompleto)
  ) {
    return null;
  }

  const mensagem =
    "Olá! Encontrei seu perfil no AchaQui e gostaria de saber mais sobre seus serviços.";

  return `https://wa.me/${numeroCompleto}?text=${encodeURIComponent(mensagem)}`;
}

function ProfissionalCard({
  profissional,
}: {
  profissional: Profissional;
}) {
  const whatsappUrl = criarLinkWhatsapp(profissional.whatsapp);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-achaqui-border bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Foto */}
      <div className="flex h-52 items-center justify-center overflow-hidden bg-[#E8F0EA]">
        {profissional.fotoUrl ? (
          <img
            src={profissional.fotoUrl}
            alt={`Foto de ${profissional.nomeProfissional}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80">
            <UserRound
              size={40}
              className="text-achaqui-green"
            />
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {profissional.categorias.map((categoria) => (
            <span
              key={categoria.id}
              className="rounded-full bg-[#E8F0EA] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-achaqui-green"
            >
              {categoria.nome}
            </span>
          ))}
        </div>

        <h3 className="mt-4 text-xl font-medium text-achaqui-text">
          {profissional.nomeProfissional}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-achaqui-muted">
          <MapPin
            size={14}
            className="shrink-0"
          />
          {profissional.bairro}, Quixadá - CE
        </p>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-achaqui-muted">
          {profissional.descricao}
        </p>

        {/* Ações */}
        <div className="mt-auto grid grid-cols-1 gap-2 pt-6 sm:grid-cols-2">
          <Link
            to={`/profissionais/${profissional.id}`}
            className="flex min-h-11 items-center justify-center rounded-xl border border-achaqui-border px-3 py-3 text-center text-xs font-semibold text-achaqui-green transition hover:border-achaqui-green"
          >
            Ver perfil
          </Link>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D8EADD] bg-[#E8F5EC] px-3 py-3 text-center text-xs font-semibold text-achaqui-green transition hover:bg-[#D9EDDF]"
            >
              <MessageCircle size={15} />
              Conversar no WhatsApp
            </a>
          ) : (
            <span className="flex min-h-11 items-center justify-center rounded-xl bg-gray-100 px-3 py-3 text-center text-xs text-achaqui-muted">
              Contato indisponível
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProfissionaisPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = searchParams.get("busca") ?? "";
  const categoriaId = searchParams.get("categoriaId") ?? "";

  const paginaParam = Number(searchParams.get("pagina"));
  const pagina =
    Number.isSafeInteger(paginaParam) && paginaParam > 0
      ? paginaParam
      : 1;

  const [textoBusca, setTextoBusca] = useState(busca);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [paginacao, setPaginacao] = useState<Paginacao | null>(null);

  const [carregando, setCarregando] = useState(true);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);
  const [erro, setErro] = useState("");
  const [erroCategorias, setErroCategorias] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Sincroniza o input quando o usuário chega com
  // uma busca da Home ou usa voltar/avançar no navegador.
  useEffect(() => {
    setTextoBusca(busca);
  }, [busca]);

  // Carrega categorias reais do backend.
  useEffect(() => {
    let ativo = true;

    async function carregarCategorias() {
      try {
        const resultado = await listarCategorias();

        if (ativo) {
          setCategorias(resultado);
          setErroCategorias(false);
        }
      } catch {
        if (ativo) {
          setErroCategorias(true);
        }
      } finally {
        if (ativo) {
          setCarregandoCategorias(false);
        }
      }
    }

    carregarCategorias();

    return () => {
      ativo = false;
    };
  }, []);

  // Busca os profissionais sempre que os filtros mudam.
  useEffect(() => {
    let ativo = true;

    async function carregarProfissionais() {
      setCarregando(true);
      setErro("");
      setProfissionais([]);
      setPaginacao(null);

      try {
        const resposta = await listarProfissionais({
          busca: busca.trim() || undefined,
          categoriaId: categoriaId || undefined,
          pagina,
          limite: LIMITE,
        });

        if (!ativo) return;

        setProfissionais(resposta.profissionais);
        setPaginacao(resposta.paginacao);
      } catch {
        if (!ativo) return;

        setErro("Não foi possível carregar os profissionais.");
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarProfissionais();

    return () => {
      ativo = false;
    };
  }, [busca, categoriaId, pagina]);

  function aplicarBusca(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);
    const termo = textoBusca.trim();

    if (termo) {
      params.set("busca", termo);
    } else {
      params.delete("busca");
    }

    params.delete("pagina");
    setSearchParams(params);
  }

  function selecionarCategoria(id: string) {
    const params = new URLSearchParams(searchParams);

    if (id) {
      params.set("categoriaId", id);
    } else {
      params.delete("categoriaId");
    }

    params.delete("pagina");
    setSearchParams(params);
    setMostrarFiltros(false);
  }

  function limparFiltros() {
    setTextoBusca("");
    setSearchParams({});
    setMostrarFiltros(false);
  }

  function mudarPagina(novaPagina: number) {
    const params = new URLSearchParams(searchParams);

    if (novaPagina <= 1) {
      params.delete("pagina");
    } else {
      params.set("pagina", String(novaPagina));
    }

    setSearchParams(params);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const filtrosAtivos = Boolean(busca || categoriaId);

  const nomeCategoriaSelecionada =
    categorias.find((categoria) => categoria.id === categoriaId)?.nome;

  const totalPaginas = paginacao?.totalPaginas ?? 0;
  const total = paginacao?.total ?? 0;

  const inicio =
    total === 0 ? 0 : (pagina - 1) * LIMITE + 1;

  const fim =
    total === 0 ? 0 : Math.min(pagina * LIMITE, total);

  return (
    <div className="min-h-screen bg-[#FCFAF8] text-achaqui-text">
      <AppHeader />
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
              Encontre profissionais da sua cidade, conheça
              seus serviços e entre em contato diretamente
              pelo WhatsApp.
            </p>

            <form
              onSubmit={aplicarBusca}
              className="mt-8 flex flex-col gap-2 rounded-2xl border border-achaqui-border bg-white p-2 shadow-[0_8px_25px_rgba(45,42,38,0.07)] sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3">
                <Search
                  size={20}
                  className="shrink-0 text-achaqui-green"
                />

                <input
                  type="search"
                  value={textoBusca}
                  onChange={(event) => setTextoBusca(event.target.value)}
                  placeholder="Qual profissional ou serviço você procura?"
                  aria-label="Pesquisar profissionais"
                  className="min-w-0 flex-1 bg-transparent text-sm text-achaqui-text outline-none placeholder:text-achaqui-muted"
                />

                {textoBusca && (
                  <button
                    type="button"
                    onClick={() => setTextoBusca("")}
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

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-8 lg:px-8">
        
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            aria-expanded={mostrarFiltros}
            className="flex w-full items-center justify-between rounded-xl border border-achaqui-border bg-white px-4 py-4 text-sm font-semibold text-achaqui-green"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={17} />
              {nomeCategoriaSelecionada ?? "Filtrar por categoria"}
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
            onClick={() => selecionarCategoria("")}
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
              onClick={() => selecionarCategoria(categoria.id)}
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

        {carregandoCategorias && (
          <p role="status" className="mt-3 text-xs text-achaqui-muted">
            Carregando categorias...
          </p>
        )}

        {erroCategorias && (
          <p role="alert" className="mt-3 text-xs text-red-600">
            Não foi possível carregar os filtros de categorias.
          </p>
        )}

        {filtrosAtivos && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-xs text-achaqui-muted">
              Filtros aplicados
            </span>

            {busca && (
              <span className="rounded-full bg-[#E8F0EA] px-3 py-1 text-xs text-achaqui-green">
                Busca: {busca}
              </span>
            )}

            {categoriaId && (
              <span className="rounded-full bg-[#E8F0EA] px-3 py-1 text-xs text-achaqui-green">
                {nomeCategoriaSelecionada ?? "Categoria selecionada"}
              </span>
            )}

            <button
              type="button"
              onClick={limparFiltros}
              className="inline-flex items-center gap-1 text-xs font-semibold text-achaqui-green hover:underline"
            >
              <X size={14} />
              Limpar filtros
            </button>
          </div>
        )}

        <div className="mt-8 border-t border-achaqui-border pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                Profissionais disponíveis
              </h2>

              <p className="mt-2 text-sm text-achaqui-muted">
                {carregando
                  ? "Buscando profissionais..."
                  : `${total} ${
                      total === 1
                        ? "profissional encontrado"
                        : "profissionais encontrados"
                    }`}
              </p>
            </div>
          </div>

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
              <p className="text-base font-semibold">
                Não foi possível carregar os resultados.
              </p>

              <p className="mt-2 text-sm text-achaqui-muted">
                Verifique a conexão com o servidor e tente novamente.
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
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
                Não encontramos profissionais para essa pesquisa.
                Tente outro nome ou uma categoria diferente.
              </p>

              {filtrosAtivos && (
                <button
                  type="button"
                  onClick={limparFiltros}
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

          {!carregando && !erro && paginacao && total > 0 && (
            <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-achaqui-border pt-7 sm:flex-row">
              <p className="text-xs text-achaqui-muted">
                Exibindo {inicio}–{fim} de {total} profissionais
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={pagina <= 1}
                  onClick={() => mudarPagina(pagina - 1)}
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
                  onClick={() => mudarPagina(pagina + 1)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-achaqui-border bg-white px-4 text-xs font-semibold text-achaqui-green disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Próxima
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <section className="bg-[#23553D] py-14 text-white lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 px-5 md:flex-row md:items-center lg:px-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F9CB7D]">
              Solicite um serviço
            </p>

            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Não encontrou o profissional que procura?
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75">
              Em breve, você poderá publicar uma solicitação
              e receber propostas de profissionais da região.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <button
              type="button"
              disabled
              title="Funcionalidade em desenvolvimento"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-achaqui-orange px-6 py-4 text-sm font-semibold text-achaqui-text opacity-70"
            >
              <Send size={17} />
              Publicar solicitação
              <ArrowRight size={16} />
            </button>

            <p className="text-xs text-white/60">
              Disponível em breve
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
