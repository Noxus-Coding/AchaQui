import { createContext } from "react";
import type { Usuario, LoginRequest } from "../api/auth.api";

export interface AuthContextData {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData | null>(null);