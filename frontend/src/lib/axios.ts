import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import {
  getAccessToken,
  setAccessToken,
} from "../features/auth/api/token";

import { renovarSessao } from "../features/auth/api/session.api";
import { notificarSessaoExpirada } from "../features/auth/api/auth-events";
import { getVersaoAutenticacao } from "../features/auth/api/token";

interface RequisicaoComRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RequisicaoComRetry
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const url = originalRequest.url ?? "";

    const rotaDeAutenticacao =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/logout");

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      rotaDeAutenticacao
    ) {
      return Promise.reject(error);
    }

    if (!originalRequest.headers.has("Authorization")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const versaoInicial = getVersaoAutenticacao();

    try {
      const response = await renovarSessao();

      originalRequest.headers.set(
        "Authorization",
        `Bearer ${response.accessToken}`
      );

      return api(originalRequest);
    } catch (refreshError) {
      if( axios.isAxiosError(refreshError) && (refreshError.response?.status === 401 || 
        refreshError.response?.status === 403) && versaoInicial === getVersaoAutenticacao()
      ){
        setAccessToken(null);
        notificarSessaoExpirada();
      }

      return Promise.reject(refreshError);
    }
  }
);
