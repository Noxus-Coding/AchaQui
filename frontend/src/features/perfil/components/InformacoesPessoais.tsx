
import { Mail, UserRound } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

export function InformacoesPessoais() {
  const { usuario } = useAuth();

  const campo =
    "w-full rounded-xl border border-[#E8DED1] bg-[#F8F3EA] px-4 py-3 text-sm text-[#2D2A26]";

  return (
    <section className="overflow-hidden rounded-2xl border border-achaqui-border bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-achaqui-border bg-[#FCFAF7] px-6 py-5">
        <UserRound size={20} className="text-achaqui-green" />

        <div>
          <h2 className="font-semibold text-achaqui-text">
            Informações pessoais
          </h2>
          <p className="text-xs text-achaqui-muted">
            Dados básicos usados para identificar sua conta.
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-6">
        <div>
          <label
            htmlFor="nome"
            className="mb-2 block text-sm font-medium text-achaqui-text"
          >
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
            value={usuario?.nome ?? ""}
            readOnly
            className={campo}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-achaqui-text"
          >
            <Mail size={15} />
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={usuario?.email ?? ""}
            readOnly
            className={campo}
          />
        </div>

        <p className="text-xs text-achaqui-muted">
          A edição dos dados pessoais será habilitada quando
          integrarmos a atualização da conta.
        </p>
      </div>
    </section>
  );
}
