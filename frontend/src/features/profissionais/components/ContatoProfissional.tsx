
import { useFormContext } from "react-hook-form";

import type { CadastroProfissionalFormData } from "../schemas/cadastro-profissional.schema";

export function ContatoProfissional() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CadastroProfissionalFormData>();

  const campo =
    "w-full rounded-xl border border-[#E8DED1] bg-white px-4 py-3 text-sm text-[#2D2A26] outline-none transition focus:border-[#2F6B4F] focus:ring-2 focus:ring-[#2F6B4F]/10";

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-achaqui-text">
          Localização e contato
        </h2>

        <p className="mt-1 text-sm text-achaqui-muted">
          Informe onde você atende e como os clientes podem entrar em contato.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="bairro"
            className="mb-2 block text-sm font-medium"
          >
            Bairro *
          </label>

          <input
            id="bairro"
            {...register("bairro")}
            className={campo}
            placeholder="Ex.: Alto São Francisco"
          />

          {errors.bairro && (
            <p className="mt-1 text-xs text-red-600">
              {errors.bairro.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="whatsapp"
            className="mb-2 block text-sm font-medium"
          >
            WhatsApp com DDD *
          </label>

          <input
            id="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...register("whatsapp")}
            className={campo}
            placeholder="(88) 99999-9999"
          />

          {errors.whatsapp && (
            <p className="mt-1 text-xs text-red-600">
              {errors.whatsapp.message}
            </p>
          )}
        </div>
      </div>

      <p className="text-xs text-achaqui-muted">
        Seu número de WhatsApp poderá ser visualizado por pessoas interessadas
        nos seus serviços.
      </p>
    </section>
  );
}
