
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function PerfilHeader() {
  return (
    <section className="bg-achaqui-cream py-10">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-xs text-achaqui-muted">
          <Link to="/dashboard" className="hover:text-achaqui-green">
            Início
          </Link>
          <span>›</span>
          <span className="font-medium text-achaqui-green">
            Meu perfil
          </span>
        </nav>

        <p className="text-xs font-bold uppercase tracking-[0.15em] text-achaqui-green">
          Sua conta AchaQui
        </p>

        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold text-achaqui-text sm:text-4xl">
              Meu perfil
            </h1>

            <p className="mt-3 max-w-xl text-sm text-achaqui-muted">
              Mantenha seus dados atualizados para usar o AchaQui
              como cliente e profissional.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-achaqui-border bg-white px-5 py-3 text-sm font-semibold text-achaqui-dark"
          >
            <ArrowLeft size={16} />
            Voltar para o início
          </Link>
        </div>
      </div>
    </section>
  );
}
