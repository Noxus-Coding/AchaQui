
import { AuthenticatedHeader } from "../../home/components/AuthenticatedHeader";

import { PerfilHeader } from "../components/PerfilHeader";
import { PerfilResumo } from "../components/PerfilResumo";
import { InformacoesPessoais } from "../components/InformacoesPessoais";
import { PerfilProfissionalCard } from "../components/PerfilProfissionalCard";

export function MeuPerfilPage() {
  return (
    <div className="min-h-screen bg-white">
      <AuthenticatedHeader />

      <main>
        <PerfilHeader />

        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 lg:grid-cols-[280px_1fr] lg:px-8">
          <PerfilResumo />

          <div className="space-y-5">
            <InformacoesPessoais />
            <PerfilProfissionalCard />
          </div>
        </div>
      </main>
    </div>
  );
}
