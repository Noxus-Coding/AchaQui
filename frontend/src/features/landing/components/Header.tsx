
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Logo } from "../../../components/ui/Logo";

const links = [
  { label: "Início", href: "/#inicio" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Para profissionais", href: "/#para-profissionais" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-achaqui-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Logo size="sm" />

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-8 md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-achaqui-muted transition hover:text-achaqui-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-achaqui-text hover:text-achaqui-green"
          >
            Entrar
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-achaqui-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-achaqui-dark"
          >
            Cadastre-se
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-achaqui-border p-2 text-achaqui-green md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegação mobile"
          className="border-t border-achaqui-border bg-white px-5 py-5 md:hidden"
        >
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-achaqui-text"
              >
                {link.label}
              </a>
            ))}

            <div className="flex gap-3 border-t border-achaqui-border pt-5">
              <Link
                to="/login"
                className="flex-1 rounded-lg border border-achaqui-border py-3 text-center text-sm font-semibold"
              >
                Entrar
              </Link>

              <Link
                to="/register"
                className="flex-1 rounded-lg bg-achaqui-green py-3 text-center text-sm font-semibold text-white"
              >
                Cadastre-se
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
