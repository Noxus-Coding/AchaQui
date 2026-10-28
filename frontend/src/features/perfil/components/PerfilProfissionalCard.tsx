
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

export function PerfilProfissionalCard() {
  return (
    <section className="flex flex-col justify-between gap-4 rounded-2xl border border-achaqui-border bg-achaqui-cream p-6 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <BriefcaseBusiness
          size={22}
          className="mt-1 shrink-0 text-[#C96B2C]"
        />

        <div>
          <h2 className="font-semibold text-achaqui-text">
            Você também oferece serviços?
          </h2>

          <p className="mt-1 text-sm text-achaqui-muted">
            Gerencie suas informações profissionais usando
            a mesma conta.
          </p>
        </div>
      </div>

      <Link
        to="/dashboard"
        className="shrink-0 rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-achaqui-green"
      >
        Acessar área profissional
      </Link>
    </section>
  );
}
