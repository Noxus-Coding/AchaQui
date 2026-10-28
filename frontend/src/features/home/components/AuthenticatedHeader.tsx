
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, UserRound } from "lucide-react";

import { Logo } from "../../../components/ui/Logo";
import { useAuth } from "../../auth/hooks/useAuth";

const navigation = [
  { label: "Início", to: "/dashboard" },
  { label: "Encontrar profissionais", to: "/profissionais" },
  { label: "Solicitações", to: "/solicitacoes" },
  { label: "Minhas atividades", to: "/dashboard#atividades" },
];

export function AuthenticatedHeader() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);

  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const primeiroNome = usuario?.nome?.split(" ")[0] ?? "Usuário";

  const iniciais = usuario?.nome
    ? usuario.nome
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join("")
        .toUpperCase()
    : "US";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-achaqui-border bg-white">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Logo size="sm" />

        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) =>
            item.to.includes("#") ? (
              <a
                key={item.label}
                href={item.to}
                className="text-xs font-medium text-achaqui-muted hover:text-achaqui-green"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `border-b-2 py-6 text-xs font-medium transition ${
                    isActive
                      ? "border-achaqui-green text-achaqui-green"
                      : "border-transparent text-achaqui-muted hover:text-achaqui-green"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setPerfilAberto(!perfilAberto)}
            aria-expanded={perfilAberto}
            className="flex items-center gap-3 rounded-xl border border-achaqui-border px-3 py-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-achaqui-green text-xs font-bold text-white">
              {iniciais}
            </span>

            <span className="text-left">
              <span className="block text-xs font-semibold text-achaqui-text">
                {primeiroNome}
              </span>
              <span className="block text-[10px] text-achaqui-muted">
                Minha conta
              </span>
            </span>

            <ChevronDown size={15} />
          </button>

          {perfilAberto && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-achaqui-border bg-white p-2 shadow-lg">
              <Link
                to="/meu-perfil"
                onClick={() => setPerfilAberto(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm hover:bg-achaqui-cream"
              >
                <UserRound size={16} />
                Minha conta
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-achaqui-green text-xs font-bold text-white">
            {iniciais}
          </span>

          <button
            type="button"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto(!menuAberto)}
            className="rounded-lg border border-achaqui-border p-2 text-achaqui-green"
          >
            {menuAberto ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {menuAberto && (
        <nav className="border-t border-achaqui-border bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMenuAberto(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-achaqui-text hover:bg-achaqui-cream"
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 flex items-center gap-2 border-t border-achaqui-border px-3 py-4 text-left text-sm text-red-600"
            >
              <LogOut size={17} />
              Sair da conta
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
