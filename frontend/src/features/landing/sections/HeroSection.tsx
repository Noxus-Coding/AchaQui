
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  MapPin,
  Search,
  Send,
  Wrench,
} from "lucide-react";

import { RegionalArt } from "../components/RegionalArt";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-achaqui-cream"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 lg:min-h-155 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        
        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-achaqui-green">
            <MapPin size={14} />
            Feito para Quixadá • CE
          </div>

          <h1 className="max-w-xl text-4xl font-medium leading-[1.12] tracking-[-0.045em] text-achaqui-text sm:text-5xl xl:text-[58px]">
            O serviço que você precisa está mais{" "}
            <span className="text-[#CB7130] underline decoration-[#CB7130] decoration-2 underline-offset-8">
              perto
            </span>{" "}
            do que imagina.
          </h1>

          <p className="mt-7 max-w-md text-sm leading-7 text-achaqui-muted sm:text-base">
            Encontre profissionais da sua cidade, conheça seus
            trabalhos e entre em contato sem complicação.
          </p>

          <div className="mt-8 rounded-2xl border border-achaqui-border bg-white p-2 shadow-[0_12px_24px_rgba(45,42,38,0.07)]">
            <div className="flex items-center gap-2 px-3 py-2">
              <Search size={19} className="shrink-0 text-achaqui-green" />

              <input
                type="search"
                placeholder="Qual serviço você está procurando?"
                aria-label="Pesquisar serviços"
                className="min-w-0 flex-1 bg-transparent text-sm text-achaqui-text outline-none placeholder:text-achaqui-muted"
              />
            </div>

            <Link
              to="/login"
              className="flex min-h-12 items-center justify-center rounded-xl bg-achaqui-green px-5 text-sm font-semibold text-white transition hover:bg-achaqui-dark sm:float-right sm:-mt-11 sm:relative"
            >
              Buscar profissionais
            </Link>

            <div className="clear-both" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-achaqui-green hover:underline"
            >
              <Send size={15} />
              Publicar solicitação
              <ArrowRight size={15} />
            </Link>

            <span className="text-xs text-achaqui-muted">
              Grátis neste lançamento
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-122.5 px-3 py-6 sm:px-8">
          <div className="relative aspect-[5/5.1] overflow-hidden rounded-[28px] bg-[#F7C987] shadow-lg">
            <RegionalArt />
          </div>

          <div className="absolute left-0 top-3 flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-xl sm:-left-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-[#CB7130]">
              <Wrench size={19} />
            </div>

            <div>
              <p className="text-[10px] text-achaqui-muted">
                Você procura
              </p>
              <p className="text-xs font-semibold text-achaqui-text">
                Eletricista perto de casa
              </p>
            </div>
          </div>

          <div className="absolute -left-1 bottom-18 flex items-center gap-2 rounded-lg bg-achaqui-green px-3 py-2 text-xs font-semibold text-white shadow-lg">
            <Check size={15} />
            Contato direto
          </div>

          <div className="absolute bottom-4 right-0 flex items-center gap-3 rounded-xl bg-white p-3 shadow-xl sm:-right-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-achaqui-cream text-sm font-bold text-achaqui-green">
              JC
            </div>

            <div>
              <p className="text-[10px] text-achaqui-muted">
                Perfil demonstrativo
              </p>
              <p className="text-xs font-semibold">João • Eletricista</p>
              <p className="flex items-center gap-1 text-[10px] text-achaqui-muted">
                <MapPin size={10} />
                Centro, Quixadá
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-7 bg-achaqui-green"
        style={{
          clipPath: "polygon(0 95%, 100% 0, 100% 100%, 0 100%)",
        }}
      />
    </section>
  );
}
