
import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../../auth/hooks/useAuth";
import { buscarMeuPerfilProfissional } from "../api/profissionais.api";
import type { Profissional } from "../types/profissional.types";

export function useMeuPerfilProfissional() {
  const { isAuthenticated, usuario } = useAuth();

  const [perfil, setPerfil] = useState<Profissional | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    if (!isAuthenticated || !usuario) {
      setPerfil(null);
      setErro(null);
      setCarregando(false);
      return;
    }

    async function carregarPerfil() {
      setCarregando(true);
      setErro(null);
      setPerfil(null);

      try {
        const resultado = await buscarMeuPerfilProfissional();

        if (ativo) {
          setPerfil(resultado);
        }
      } catch (error) {
        if (!ativo) return;

        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          setErro("Sua sessão expirou. Faça login novamente.");
        } else {
          setErro("Não foi possível carregar seu perfil profissional.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarPerfil();

    return () => {
      ativo = false;
    };
  }, [isAuthenticated, usuario?.id]);

  return {
    perfil,
    possuiPerfil: perfil !== null,
    carregando,
    erro,
  };
}
