import { api } from "../../../lib/axios";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  criadoEm?: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface RegisterResponse {
  message: string;
  usuario: Usuario;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  usuario: Usuario;
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
}

export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>(
    "/auth/register",
    data
  );

  return response.data;
}

export async function loginUser(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
}