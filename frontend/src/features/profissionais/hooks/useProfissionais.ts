
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  listarCategorias,
  listarProfissionais,
} from "../api/profissionais.api";

import type {
  Categoria,
  Paginacao,
  Profissional,
} from "../types/profissional.types";

const LIMITE = 6;

export function useProfissionais() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = searchParams.get("busca") ?? "";
  const categoriaId = searchParams.get("categoriaId") ?? "";

  const paginaParam = Number(searchParams.get("pagina"));

  const pagina =
    Number.isSafeInteger(paginaParam) && paginaParam > 0
      ? paginaParam
      : 1;

  const [textoBusca, setTextoBusca] = useState(busca);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [paginacao, setPaginacao] = useState<Paginacao | null>(null);

  const [carregando, setCarregando] = useState(true);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);
  const [erro, setErro] = useState("");
  const [erroCategorias, setErroCategorias] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    setTextoBusca(busca);
  }, [busca]);

  // Carregar categorias
  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const resultado = await listarCategorias();

        if (ativo) {
          setCategorias(resultado);
          setErroCategorias(false);
        }
      } catch {
        if (ativo) setErroCategorias(true);
      } finally {
        if (ativo) setCarregandoCategorias(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  // Carregar profissionais a cada alteração dos filtros
  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setErro("");

      try {
        const resultado = await listarProfissionais({
          busca: busca.trim() || undefined,
          categoriaId: categoriaId || undefined,
          pagina,
          limite: LIMITE,
        });

        if (!ativo) return;

        setProfissionais(resultado.profissionais);
        setPaginacao(resultado.paginacao);
      } catch {
        if (ativo) {
          setErro("Verifique sua conexão e tente novamente.");
          setProfissionais([]);
          setPaginacao(null);
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [busca, categoriaId, pagina, tentativa]);

  const atualizarParametros = useCallback(
    (alteracoes: Record<string, string | null>) => {
      setSearchParams((anteriores) => {
        const novos = new URLSearchParams(anteriores);

        for (const [chave, valor] of Object.entries(alteracoes)) {
          if (valor) {
            novos.set(chave, valor);
          } else {
            novos.delete(chave);
          }
        }

        return novos;
      });
    },
    [setSearchParams]
  );

  function aplicarBusca() {
    atualizarParametros({
      busca: textoBusca.trim(),
      pagina: null,
    });
  }

  function selecionarCategoria(id: string) {
    atualizarParametros({
      categoriaId: id,
      pagina: null,
    });
  }

  function limparFiltros() {
    setTextoBusca("");
    setSearchParams({});
  }

  function mudarPagina(novaPagina: number) {
    atualizarParametros({
      pagina: novaPagina <= 1 ? null : String(novaPagina),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function tentarNovamente() {
    setTentativa((atual) => atual + 1);
  }

  return {
    // Dados
    profissionais,
    categorias,
    paginacao,

    // Filtros
    busca,
    textoBusca,
    setTextoBusca,
    categoriaId,
    filtrosAtivos: Boolean(busca || categoriaId),

    carregando,
    carregandoCategorias,
    erro,
    erroCategorias,

    aplicarBusca,
    selecionarCategoria,
    limparFiltros,
    mudarPagina,
    tentarNovamente,
  };
}
