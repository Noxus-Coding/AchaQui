
import { Link } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";

import { AuthenticatedHeader } from "../../home/components/AuthenticatedHeader";
import { CadastroProfissionalForm } from "../components/CadastroProfissionalForm";

export function CadastroProfissionalPage() {
  return (
    <div className="min-h-screen bg-achaqui-cream">
      <AuthenticatedHeader />

      <main className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-achaqui-green hover:underline"
        >
          <ArrowLeft size={16} />
          Voltar ao início
        </Link>

        <div className="mt-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F0EA] text-achaqui-green">
            <BriefcaseBusiness size={28} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-achaqui-text">
            Crie seu perfil profissional
          </h1>

          <p className="mt-3 max-w-2xl text-achaqui-muted">
            Apresente seus serviços para pessoas de Quixadá.
            Preencha suas informações profissionais para começar
            a divulgar seu trabalho no AchaQui.
          </p>
        </div>

        <section className="mt-8 rounded-2xl border border-achaqui-border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-achaqui-text">
            Informações profissionais
          </h2>

          <p className="mt-2 text-sm text-achaqui-muted">
            Seus dados serão apresentados no perfil público.
          </p>

          <div className="mt-8 rounded-xl border border-dashed border-achaqui-border bg-achaqui-cream p-10 text-center">
            <div className="mt-8">
              <CadastroProfissionalForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
