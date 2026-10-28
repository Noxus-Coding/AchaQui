
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Header } from "../../landing/components/Header";
import { Footer } from "../../landing/sections/LandingExtras";
import { buscarProfissionalPorId } from "../api/profissionais.api";
import type { Profissional } from "../types/profissional.types";

function formatarWhatsapp(numero: string) {
  const digitos = numero.replace(/\D/g, "");

  if (digitos.length === 10 || digitos.length === 11) {
    return `55${digitos}`;
  }

  if (
    (digitos.length === 12 || digitos.length === 13) &&
    digitos.startsWith("55")
  ) {
    return digitos;
  }

  return null;
}

function FotoProfissional({
  profissional,
}: {
  profissional: Profissional;
}) {
  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-[#E8F0EA] shadow-md sm:h-28 sm:w-28">
      {profissional.fotoUrl ? (
        <img
          src={profissional.fotoUrl}
          alt={`Foto de ${profissional.nomeProfissional}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <UserRound size={44} className="text-achaqui-green" />
      )}
    </div>
  );
}

export function ProfissionalDetalhesPage() {
  const { id } = useParams<{ id: string }>();

  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarProfissional() {
      setCarregando(true);
      setErro("");
      setProfissional(null);

      try {
        if (!id) {
          throw new Error("ID não informado");
        }

        const resposta = await buscarProfissionalPorId(id);

        if (ativo) {
          setProfissional(resposta.profissional);
        }
      } catch (error) {
        if (!ativo) return;

        if (
          axios.isAxiosError(error) &&
          error.response?.status === 404
        ) {
          setErro("Profissional não encontrado.");
        } else {
          setErro("Não foi possível carregar o perfil profissional.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarProfissional();

    return () => {
      ativo = false;
    };
  }, [id]);

  const whatsapp = profissional
    ? formatarWhatsapp(profissional.whatsapp)
    : null;

  const mensagem = profissional
    ? `Olá! Encontrei seu perfil no AchaQui e gostaria de conversar sobre seus serviços.`
    : "";

  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`
    : null;

  const categoriaPrincipal = profissional?.categorias[0]?.nome;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-achaqui-text">
      <Header />

      {carregando && (
        <main
          role="status"
          className="mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-5"
        >
          <p className="text-sm text-achaqui-muted">
            Carregando perfil profissional...
          </p>
        </main>
      )}

      {!carregando && erro && (
        <main className="mx-auto min-h-[50vh] max-w-6xl px-5 py-16">
          <div
            role="alert"
            className="rounded-2xl border border-achaqui-border bg-white p-8 text-center"
          >
            <h1 className="text-2xl font-semibold">
              Não foi possível abrir o perfil
            </h1>

            <p className="mt-3 text-sm text-achaqui-muted">
              {erro}
            </p>

            <Link
              to="/profissionais"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-achaqui-green"
            >
              <ArrowLeft size={16} />
              Voltar aos profissionais
            </Link>
          </div>
        </main>
      )}

      {!carregando && !erro && profissional && (
        <>
          {/* CABEÇALHO DO PERFIL */}
          <section className="bg-[#F6EBDD]">
            <div className="mx-auto max-w-6xl px-5 pb-10 pt-7 lg:px-8">
              <Link
                to="/profissionais"
                className="inline-flex items-center gap-2 text-xs font-medium text-achaqui-muted hover:text-achaqui-green"
              >
                <ArrowLeft size={14} />
                Voltar para a busca
              </Link>

              <div className="mt-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                <FotoProfissional profissional={profissional} />

                <div className="min-w-0 flex-1">
                  <p className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#C57936] sm:justify-start">
                    <BriefcaseBusiness size={13} />
                    Perfil profissional
                  </p>

                  <h1 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
                    {profissional.nomeProfissional}
                  </h1>

                  <p className="mt-2 text-sm font-semibold text-achaqui-green">
                    {categoriaPrincipal ?? "Profissional"}
                  </p>

                  <p className="mt-3 flex items-center justify-center gap-2 text-xs text-achaqui-muted sm:justify-start">
                    <MapPin size={14} />
                    {profissional.bairro}, Quixadá - CE
                  </p>
                </div>

                <div className="flex w-full flex-col items-center sm:w-auto sm:items-end">
                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C9E8D1] bg-[#E8F5EC] px-5 py-3 text-sm font-semibold text-achaqui-green transition hover:bg-[#D9EDDF] sm:w-auto"
                    >
                      <MessageCircle size={17} />
                      Conversar no WhatsApp
                    </a>
                  ) : (
                    <span className="text-xs text-achaqui-muted">
                      Contato indisponível
                    </span>
                  )}

                  <span className="mt-2 text-[10px] text-achaqui-muted">
                    Contato direto com o profissional
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* CONTEÚDO PRINCIPAL */}
          <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-12">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
              {/* COLUNA PRINCIPAL */}
              <div className="space-y-5">
                {/* SOBRE O PROFISSIONAL */}
                <section className="rounded-2xl border border-achaqui-border bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-achaqui-green">
                    Sobre o profissional
                  </p>

                  <h2 className="mt-3 text-2xl font-medium tracking-tight">
                    Trabalho próximo, atendimento direto.
                  </h2>

                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-achaqui-muted">
                    {profissional.descricao}
                  </p>

                  {profissional.experiencia && (
                    <div className="mt-5 rounded-xl bg-[#FFF3DE] p-4">
                      <p className="text-xs font-semibold text-[#A96326]">
                        Experiência profissional
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#80582F]">
                        {profissional.experiencia}
                      </p>
                    </div>
                  )}
                </section>

                {/* SERVIÇOS OFERECIDOS */}
                <section className="rounded-2xl border border-achaqui-border bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-achaqui-green">
                    Serviços oferecidos
                  </p>

                  <h2 className="mt-3 text-2xl font-medium tracking-tight">
                    Como posso ajudar
                  </h2>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {profissional.categorias.map((categoria) => (
                      <div
                        key={categoria.id}
                        className="flex min-h-14 items-center gap-3 rounded-xl border border-achaqui-border bg-[#FCFAF7] px-4 py-3"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E8F0EA] text-achaqui-green">
                          <Check size={16} />
                        </span>

                        <span className="text-sm font-medium">
                          {categoria.nome}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-5 text-achaqui-muted">
                    Essas são as categorias cadastradas pelo profissional.
                    Os serviços específicos podem ser combinados diretamente.
                  </p>
                </section>

                {/* PORTFÓLIO */}
                <section className="rounded-2xl border border-achaqui-border bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-achaqui-green">
                    Portfólio
                  </p>

                  <h2 className="mt-3 text-2xl font-medium tracking-tight">
                    Alguns trabalhos
                  </h2>

                  <div className="mt-6 flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-[#E6D4BA] bg-[#FFF4E2] p-8 text-center">
                    <Sparkles
                      size={28}
                      className="text-[#C57936]"
                    />

                    <h3 className="mt-4 text-base font-semibold">
                      Espaço para mais trabalhos
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-achaqui-muted">
                      Em breve, os profissionais poderão apresentar
                      fotos e exemplos dos serviços realizados.
                    </p>
                  </div>
                </section>
              </div>

              {/* COLUNA LATERAL */}
              <aside className="space-y-5">
                {/* CONTATO */}
                <div className="rounded-2xl border border-achaqui-border bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5EC] text-achaqui-green">
                    <MessageCircle size={22} />
                  </div>

                  <h2 className="mt-5 text-lg font-medium">
                    Gostou do trabalho?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-achaqui-muted">
                    Converse diretamente com o profissional e combine
                    os detalhes do serviço.
                  </p>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#E8F5EC] px-4 py-3 text-sm font-semibold text-achaqui-green transition hover:bg-[#D9EDDF]"
                    >
                      <MessageCircle size={16} />
                      Chamar no WhatsApp
                    </a>
                  )}

                  <p className="mt-4 text-center text-[10px] leading-4 text-achaqui-muted">
                    O AchaQui apenas facilita o contato entre as pessoas.
                  </p>
                </div>

                {/* INFORMAÇÕES */}
                <div className="rounded-2xl border border-achaqui-border bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium">
                    Informações do perfil
                  </h2>

                  <div className="mt-5 space-y-5 border-t border-achaqui-border pt-5">
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={17}
                        className="mt-1 shrink-0 text-achaqui-green"
                      />

                      <div>
                        <p className="text-xs text-achaqui-muted">
                          Área atendida
                        </p>

                        <p className="text-sm font-semibold">
                          {profissional.bairro}, Quixadá
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <BriefcaseBusiness
                        size={17}
                        className="mt-1 shrink-0 text-achaqui-green"
                      />

                      <div>
                        <p className="text-xs text-achaqui-muted">
                          Categorias profissionais
                        </p>

                        <p className="text-sm font-semibold">
                          {profissional.categorias
                            .map((categoria) => categoria.nome)
                            .join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <ShieldCheck
                        size={17}
                        className="mt-1 shrink-0 text-achaqui-green"
                      />

                      <div>
                        <p className="text-xs text-achaqui-muted">
                          Avaliações
                        </p>

                        <p className="text-sm font-semibold">
                          Ainda não disponíveis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>

          {/* CHAMADA INFERIOR */}
          <section className="bg-[#23553D] py-12 text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F9CB7D]">
                  AchaQui
                </p>

                <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                  Precisa de outro tipo de serviço?
                </h2>

                <p className="mt-3 text-sm text-white/70">
                  Explore mais profissionais e categorias da cidade.
                </p>
              </div>

              <Link
                to="/profissionais"
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-achaqui-orange px-5 py-3 text-sm font-semibold text-achaqui-text"
              >
                Ver outros profissionais
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
