
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Logo } from "../../../components/ui/Logo"

interface AuthLayoutProps {
  children: ReactNode;
}


function RegionalIllustration() {
  return (
    <svg
      viewBox="0 0 600 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#80916C" />
          <stop offset="100%" stopColor="#244D39" />
        </linearGradient>
      </defs>

      <rect width="600" height="500" fill="url(#sky)" />

      <circle
        cx="440"
        cy="115"
        r="65"
        fill="#E59B3A"
        opacity="0.25"
      />

      <path
        d="M0 350 C80 290 110 300 160 220
           C200 160 270 160 300 230
           C330 300 300 340 350 355
           C410 370 430 250 500 260
           C560 270 570 340 600 360
           L600 500 L0 500 Z"
        fill="#526B48"
      />

      <path
        d="M0 420 C120 375 190 420 290 395
           C400 365 510 390 600 350
           L600 500 L0 500 Z"
        fill="#355A42"
      />

      <path
        d="M0 465 C130 425 260 455 360 430
           C470 400 540 420 600 395
           L600 500 L0 500 Z"
        fill="#244735"
      />
    </svg>
  );
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-achaqui-cream lg:grid lg:grid-cols-2">
      {/* Painel regional para desktop */}
      <aside className="relative hidden min-h-screen overflow-hidden bg-achaqui-dark lg:flex lg:flex-col lg:justify-between">
        <RegionalIllustration />

        <div className="relative z-10 p-10">
          <Logo variant="light" size="md" />
        </div>

        <div className="relative z-10 bg-linear-to-t from-[#183C2D]/95 to-transparent px-10 pb-14 pt-32">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-achaqui-orange">
            Feito para Quixadá
          </span>

          <h1 className="mt-4 max-w-lg text-4xl font-semibold leading-tight text-white xl:text-5xl">
            Conexões que fazem nossa cidade acontecer.
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-white/80">
            Encontre profissionais de confiança ou divulgue seu
            trabalho para quem está por perto.
          </p>

          <p className="mt-10 text-xs text-white/60">
            Inspirado nas paisagens e nos monólitos de Quixadá.
          </p>
        </div>
      </aside>

      {/* Área dos formulários */}
      <section className="flex min-h-screen flex-col px-5 py-8 sm:px-8 lg:items-center lg:justify-center lg:px-12">
        <header className="mb-10 lg:hidden">
          <Logo variant="default" size="md" />
        </header>

        <div className="mx-auto w-full max-w-115 rounded-2xl border border-achaqui-border bg-white p-6 shadow-[0_12px_40px_rgba(45,42,38,0.06)] sm:p-9">
          {children}
        </div>

        <p className="mx-auto mt-8 max-w-sm text-center text-xs leading-5 text-achaqui-muted lg:hidden">
          Conectando pessoas e oportunidades em Quixadá.
        </p>
      </section>
    </main>
  );
}
