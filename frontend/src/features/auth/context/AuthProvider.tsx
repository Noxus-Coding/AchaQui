
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import { loginUser } from "../api/auth.api";
import type { LoginRequest, Usuario } from "../api/auth.api";
import { renovarSessao, encerrarSessao } from "../api/session.api";
import {
  setAccessToken,
  invalidarAutenticacao,
} from "../api/token";
import { observarSessaoExpirada } from "../api/auth-events";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  const versaoSessao = useRef(0);

  
  useEffect(() => {
    return observarSessaoExpirada(() => {
      ++versaoSessao.current;

      limparSessaoLocal();
      setCarregandoSessao(false);
    });
  }, []);


  function limparSessaoLocal() {
    invalidarAutenticacao();
    setUsuario(null);
  }

  async function login(data: LoginRequest) {
    const versao = ++versaoSessao.current;

    const response = await loginUser(data);

    if (versao !== versaoSessao.current) return;

    setAccessToken(response.accessToken);
    setUsuario(response.usuario);
    setCarregandoSessao(false);
  }

  async function logout() {
    ++versaoSessao.current;

    limparSessaoLocal();
    setCarregandoSessao(false);

    try {
      await encerrarSessao();
    } catch (error) {
      console.error("Não foi possível encerrar a sessão:", error);
    }
  }

  useEffect(() => {
    let ativo = true;
    const versao = ++versaoSessao.current;

    async function recuperarSessao() {
      try {
        const response = await renovarSessao();

        if (!ativo || versao !== versaoSessao.current) return;

        setAccessToken(response.accessToken);
        setUsuario(response.usuario);
      } catch {
        if (!ativo || versao !== versaoSessao.current) return;

        limparSessaoLocal();
      } finally {
        if (ativo && versao === versaoSessao.current) {
          setCarregandoSessao(false);
        }
      }
    }

    void recuperarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: usuario !== null,
        carregandoSessao,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
