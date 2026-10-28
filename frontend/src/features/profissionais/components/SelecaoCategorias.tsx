
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Check, LoaderCircle } from "lucide-react";

import { listarCategorias } from "../api/profissionais.api";
import type { Categoria } from "../types/profissional.types";
import type { CadastroProfissionalFormData } from "../schemas/cadastro-profissional.schema";

export function SelecaoCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CadastroProfissionalFormData>();

  const selecionadas = watch("categoriaIds");

  useEffect(() => {
    let ativo = true;

    async function carregarCategorias() {
      try {
        const resultado = await listarCategorias();

        if (ativo) setCategorias(resultado);
      } catch {
        if (ativo) {
          setErro("Não foi possível carregar as categorias.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregarCategorias();

    return () => {
      ativo = false;
    };
  }, []);

  function alternarCategoria(id: string) {
    const atualizadas = selecionadas.includes(id)
      ? selecionadas.filter((categoriaId) => categoriaId !== id)
      : [...selecionadas, id];

    setValue("categoriaIds", atualizadas, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-achaqui-text">
          Categorias de serviços
        </h2>
        <p className="mt-1 text-sm text-achaqui-muted">
          Selecione pelo menos uma categoria. Você pode escolher várias.
        </p>
      </div>

      {carregando ? (
        <p role="status" className="flex items-center gap-2 text-sm text-achaqui-muted">
          <LoaderCircle size={18} className="animate-spin" />
          Carregando categorias...
        </p>
      ) : erro ? (
        <p role="alert" className="text-sm text-red-600">
          {erro}
        </p>
      ) : categorias.length === 0 ? (
        <p className="text-sm text-achaqui-muted">
          Nenhuma categoria disponível no momento.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {categorias.map((categoria) => {
            const selecionada = selecionadas.includes(categoria.id);

            return (
              <button
                key={categoria.id}
                type="button"
                aria-pressed={selecionada}
                onClick={() => alternarCategoria(categoria.id)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  selecionada
                    ? "border-achaqui-green bg-[#E8F0EA] text-achaqui-dark"
                    : "border-achaqui-border bg-white text-achaqui-text hover:border-achaqui-green"
                }`}
              >
                <span>{categoria.nome}</span>
                {selecionada && <Check size={18} />}
              </button>
            );
          })}
        </div>
      )}

      {errors.categoriaIds && (
        <p role="alert" className="text-xs text-red-600">
          {errors.categoriaIds.message}
        </p>
      )}
    </section>
  );
}
