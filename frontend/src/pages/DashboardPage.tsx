import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export function DashboardPage() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-achaqui-cream p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8">
        <h1 className="text-3xl font-semibold text-achaqui-green">
          Olá, {usuario?.nome}!
        </h1>

        <p className="mt-3 text-achaqui-muted">
          Você está na área autenticada do AchaQui.
        </p>

        <div className="mt-6 flex gap-4">
          <Link to="/" className="text-achaqui-green underline">
            Página inicial
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-achaqui-green px-5 py-2 text-white"
          >
            Sair
          </button>
        </div>
      </div>
    </main>
  );
}