import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import { loginUser } from "../api/auth.api";
import type { LoginRequest, Usuario } from "../api/auth.api";
import { setAccessToken } from "../api/token";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const expirationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function logout() {
    setAccessToken(null);
    setUsuario(null);

    if (expirationTimer.current) {
      clearTimeout(expirationTimer.current);
      expirationTimer.current = null;
    }
  }

  async function login(data: LoginRequest) {
    const response = await loginUser(data);

    logout();

    setAccessToken(response.accessToken);
    setUsuario(response.usuario);

    // Encerrar a sessão quando o token expirar.
    const expiresInMs = response.expiresIn * 1000;

    if (expiresInMs > 0) {
      expirationTimer.current = setTimeout(() => {
        logout();
      }, expiresInMs);
    }
  }

  useEffect(() => {
    return () => {
      setAccessToken(null);

      if (expirationTimer.current) {
        clearTimeout(expirationTimer.current);
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: usuario !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}