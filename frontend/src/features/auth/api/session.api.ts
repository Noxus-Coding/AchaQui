
import axios from "axios";

import {
  getVersaoAutenticacao,
  setAccessToken,
} from "./token";

interface UsuarioSessao {
  id: string;
  nome: string;
  email: string;
}

export interface RefreshResponse {
  usuario: UsuarioSessao;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

const sessionApi = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

let refreshEmAndamento: Promise<RefreshResponse> | null = null;

export function renovarSessao(): Promise<RefreshResponse> {
  if (refreshEmAndamento) {
    return refreshEmAndamento;
  }

  const versaoInicial = getVersaoAutenticacao();

  const requisicao = sessionApi
    .post<RefreshResponse>("/auth/refresh")
    .then(({ data }) => {
      if (versaoInicial !== getVersaoAutenticacao()) {
        throw new Error("SESSAO_INVALIDADA");
      }

      setAccessToken(data.accessToken);

      return data;
    });

  refreshEmAndamento = requisicao;

  void requisicao
    .finally(() => {
      if (refreshEmAndamento === requisicao) {
        refreshEmAndamento = null;
      }
    })
    .catch(() => {
      // A rejeição original será tratada por quem chamou.
    });

  return requisicao;
}

export async function encerrarSessao(): Promise<void> {
  await sessionApi.post("/auth/logout");
}
