
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCadastroProfissional } from "../hooks/useCadastroProfissional";
import { InformacoesProfissionais } from "./InformacoesProfissionais";
import { ContatoProfissional } from "./ContatoProfissional";
import { SelecaoCategorias } from "./SelecaoCategorias";

export function CadastroProfissionalForm() {
  const { form, onSubmit, erroCadastro } = useCadastroProfissional();
  const navigate = useNavigate();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <InformacoesProfissionais />

        <div className="border-t border-achaqui-border pt-8">
          <ContatoProfissional />
        </div>

        <div className="border-t border-achaqui-border pt-8">
          <SelecaoCategorias />
        </div>

        {erroCadastro && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {erroCadastro}
          </p>
        )}
        <div className="flex flex-col-reverse gap-3 border-t border-achaqui-border pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-achaqui-border px-6 py-3 text-sm font-semibold text-achaqui-text transition hover:bg-achaqui-cream"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="rounded-xl bg-achaqui-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-achaqui-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {form.formState.isSubmitting
              ? "Criando perfil..."
              : "Criar perfil profissional"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
