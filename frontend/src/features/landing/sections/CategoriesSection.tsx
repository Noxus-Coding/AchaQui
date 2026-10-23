
import {
  ArrowRight,
  ChevronRight,
  Construction,
  HousePlug,
  Laptop,
  PaintRoller,
  Paintbrush,
  Scissors,
  Sparkles,
  Sofa,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Eletricista", icon: HousePlug },
  { name: "Encanador", icon: Wrench },
  { name: "Pedreiro", icon: Construction },
  { name: "Diarista", icon: Sparkles },
  { name: "Manicure", icon: Paintbrush },
  { name: "Pintor", icon: PaintRoller },
  { name: "Técnico em informática", icon: Laptop },
  { name: "Montador de móveis", icon: Sofa },
];

export function CategoriesSection() {
  return (
    <section id="servicos" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-achaqui-green">
              Serviços por perto
            </span>

            <h2 className="mt-3 max-w-md text-3xl font-medium leading-tight tracking-tight text-achaqui-text sm:text-4xl">
              O que você precisa resolver hoje?
            </h2>

            <p className="mt-3 text-sm text-achaqui-muted">
              Comece por uma categoria e encontre quem pode ajudar.
            </p>
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-achaqui-green"
          >
            Ver todas as categorias
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map(({ name, icon: Icon }) => (
            <Link
              key={name}
              to="/login"
              className="group flex min-h-28 items-center justify-between gap-3 rounded-2xl border border-achaqui-border bg-white p-4 transition hover:-translate-y-1 hover:border-achaqui-green/40 hover:shadow-lg"
            >
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F0EA] text-achaqui-green">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <span className="text-xs font-semibold text-achaqui-text sm:text-sm">
                  {name}
                </span>
              </div>

              <ChevronRight
                size={16}
                className="shrink-0 text-achaqui-muted transition group-hover:translate-x-1 group-hover:text-achaqui-green"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
