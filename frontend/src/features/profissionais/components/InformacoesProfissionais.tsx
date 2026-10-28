
import { useFormContext } from "react-hook-form";

import type { CadastroProfissionalFormData } from "../schemas/cadastro-profissional.schema";

export function InformacoesProfissionais() {
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
          Informações profissionais
        </h2>
        <p className="mt-1 text-sm text-achaqui-muted">
          Conte um pouco sobre você e os serviços que oferece.
        </p>
      </div>

      <div>
        <label
          htmlFor="nomeProfissional"
          className="mb-2 block text-sm font-medium"
        >
          Nome profissional *
        </label>
        <input
          id="nomeProfissional"
          {...register("nomeProfissional")}
          className={campo}
          placeholder="Ex.: João Carlos - Eletricista"
        />
        {errors.nomeProfissional && (
          <p className="mt-1 text-xs text-red-600">
            {errors.nomeProfissional.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="descricao"
          className="mb-2 block text-sm font-medium"
        >
          Descrição profissional *
        </label>
        <textarea
          id="descricao"
          {...register("descricao")}
          rows={4}
          className={campo}
          placeholder="Descreva os serviços que você oferece..."
        />
        {errors.descricao && (
          <p className="mt-1 text-xs text-red-600">
            {errors.descricao.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="experiencia"
          className="mb-2 block text-sm font-medium"
        >
          Experiência profissional
        </label>
        <textarea
          id="experiencia"
          {...register("experiencia")}
          rows={3}
          className={campo}
          placeholder="Ex.: 5 anos de experiência em instalações elétricas."
        />
      </div>

      <div>
        <label
          htmlFor="fotoUrl"
          className="mb-2 block text-sm font-medium"
        >
          URL da foto profissional
        </label>
        <input
          id="fotoUrl"
          type="url"
          {...register("fotoUrl")}
          className={campo}
          placeholder="https://exemplo.com/foto.jpg"
        />
        {errors.fotoUrl && (
          <p className="mt-1 text-xs text-red-600">
            {errors.fotoUrl.message}
          </p>
        )}
      </div>
    </section>
  );
}
