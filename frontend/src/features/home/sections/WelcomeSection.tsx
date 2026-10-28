
import { MapPin } from "lucide-react";

import { useAuth } from "../../auth/hooks/useAuth";
import { RegionalArt } from "../../landing/components/RegionalArt";

export function WelcomeSection() {
  const { usuario } = useAuth();

  const primeiroNome = usuario?.nome?.trim().split(/\s+/)[0] ?? "Usuário";

  return (
    <section className="overflow-hidden bg-achaqui-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-0 pt-10 md:grid-cols-2 md:gap-14 lg:px-8 lg:pt-14">
        {/* Saudação */}
        <div className="pb-8 md:pb-12">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-achaqui-green">
            <MapPin size={14} />
            Quixadá, Ceará
          </p>

          <h1 className="mt-5 max-w-xl text-4xl font-medium leading-[1.12] tracking-[-0.045em] text-achaqui-text sm:text-5xl">
            Olá, {primeiroNome}!
            <span className="block">O que vamos resolver hoje?</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-achaqui-muted sm:text-base">
            Encontre profissionais da sua cidade ou publique uma
            solicitação para receber propostas.
          </p>
        </div>

        <div className="mx-auto w-full max-w-107.5 self-end">
          <div className="h-55 overflow-hidden rounded-t-[90px] bg-[#F9CB7D] sm:h-67.5 md:h-72.5">
            <RegionalArt />
          </div>
        </div>
      </div>
    </section>
  );
}
