
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Pencil,
  Plus,
  UserRound,
} from "lucide-react";

import { useMeuPerfilProfissional } from "../../profissionais/hooks/useMeuPerfilProfissional";

export function ProfessionalAreaSection() {
  const { perfil, possuiPerfil, carregando, erro } =
    useMeuPerfilProfissional();

  return (
    <section className="bg-achaqui-cream py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-achaqui-green">
          Área profissional
        </p>

        {carregando && (
          <div
            role="status"
            className="mt-6 animate-pulse rounded-2xl bg-white p-8"
          >
            <div className="h-6 w-48 rounded bg-gray-100" />
            <div className="mt-4 h-4 w-72 max-w-full rounded bg-gray-100" />
          </div>
        )}

        {!carregando && erro && (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-achaqui-border bg-white p-7"
          >
            <p className="text-sm text-red-600">{erro}</p>
          </div>
        )}

        {!carregando && !erro && !possuiPerfil && (
          <div className="mt-6 flex flex-col gap-8 overflow-hidden rounded-2xl border border-achaqui-border bg-white p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F0EA] text-achaqui-green">
                <BriefcaseBusiness size={24} />
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-achaqui-text sm:text-3xl">
                Você também oferece algum serviço?
              </h2>

              <p className="mt-3 text-sm leading-7 text-achaqui-muted">
                Crie seu perfil profissional e comece a divulgar seu
                trabalho para pessoas de Quixadá.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-achaqui-muted">
                <Plus size={18} />
                Criar perfil profissional
              </span>

              <p className="text-xs text-achaqui-muted">
                Formulário de cadastro em desenvolvimento
              </p>
            </div>
          </div>
        )}

        {!carregando && !erro && possuiPerfil && perfil && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-achaqui-border bg-white p-7 sm:p-9">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E8F0EA] text-achaqui-green">
                  <UserRound size={27} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-achaqui-green">
                    Seu espaço profissional
                  </p>

                  <h2 className="mt-1 text-2xl font-semibold text-achaqui-text">
                    {perfil.nomeProfissional}
                  </h2>

                  <p className="mt-1 text-sm text-achaqui-muted">
                    {perfil.categorias.map((categoria) => categoria.nome).join(", ")}
                  </p>
                </div>
              </div>

              <Link
                to={`/profissionais/${perfil.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-achaqui-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-achaqui-dark"
              >
                Ver meu perfil
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-achaqui-border pt-6">
              <span className="inline-flex items-center gap-2 rounded-xl border border-achaqui-border bg-achaqui-cream px-4 py-3 text-sm text-achaqui-muted">
                <Pencil size={16} />
                Editar perfil — em breve
              </span>

              <span className="inline-flex items-center gap-2 rounded-xl border border-achaqui-border bg-achaqui-cream px-4 py-3 text-sm text-achaqui-muted">
                <BriefcaseBusiness size={16} />
                Explorar solicitações — em breve
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
