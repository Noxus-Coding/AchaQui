
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { isAuthenticated, carregandoSessao } = useAuth();

  if (carregandoSessao) {
    return (
      <div
        role="status"
        className="flex min-h-screen items-center justify-center bg-white"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-achaqui-green" />

          <p className="text-sm text-gray-600">
            Recuperando sua sessão...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
