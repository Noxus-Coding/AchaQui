
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Search } from "lucide-react";

export function QuickActionsSection() {
  return (
    <section className="bg-white py-8 lg:py-10">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-2 lg:px-8">
        {/* Buscar profissionais */}
        <article className="relative overflow-hidden rounded-2xl bg-[#23553D] p-7 text-white sm:p-9">
          <div className="relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Search size={22} />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F8CB7F]">
              Encontre ajuda
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-tight">
              Precisa de um profissional?
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
              Encontre quem pode ajudar com o serviço que você precisa.
            </p>

            <Link
              to="/profissionais"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-achaqui-green transition hover:bg-achaqui-cream"
            >
              Buscar profissionais
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="pointer-events-none absolute -bottom-20 -right-14 h-52 w-52 rounded-full border-30 border-white/10" />
        </article>

        {/* Publicar solicitação */}
        <article className="relative overflow-hidden rounded-2xl bg-[#F6DFBE] p-7 text-achaqui-text sm:p-9">
          <div className="relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70 text-[#C96B2C]">
              <Megaphone size={22} />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#C96B2C]">
              Receba propostas
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-tight">
              Prefere receber propostas?
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-achaqui-muted">
              Descreva o que precisa e receba propostas de profissionais da região.
            </p>

            <button
              type="button"
              disabled
              title="Funcionalidade em desenvolvimento"
              className="mt-6 inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-achaqui-orange px-5 py-3 text-sm font-semibold text-achaqui-text opacity-70"
            >
              Publicar solicitação
              <ArrowRight size={17} />
            </button>

            <p className="mt-2 text-xs text-[#A15A27]">
              Disponível em breve
            </p>
          </div>

          <div className="pointer-events-none absolute -bottom-20 -right-14 h-52 w-52 rounded-full border-30 border-[#C96B2C]/10" />
        </article>
      </div>
    </section>
  );
}
