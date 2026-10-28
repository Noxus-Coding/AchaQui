
import { MapPin } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

export function PerfilResumo() {
  const { usuario } = useAuth();

  const iniciais = (usuario?.nome ?? "U")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();

  return (
    <aside className="h-fit rounded-2xl border border-achaqui-border bg-white p-6 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-achaqui-green text-2xl font-bold text-white">
        {iniciais}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-achaqui-text">
        {usuario?.nome}
      </h2>

      <p className="mt-1 break-all text-sm text-achaqui-muted">
        {usuario?.email}
      </p>

      <div className="mt-4 flex items-center justify-center gap-1 text-xs text-achaqui-green">
        <MapPin size={14} />
        Quixadá, Ceará
      </div>

      <div className="mt-6 rounded-xl bg-[#FFF4DE] p-4 text-left text-xs leading-5 text-[#8C6226]">
        O AchaQui permite utilizar a mesma conta para contratar
        serviços e divulgar seu trabalho.
      </div>
    </aside>
  );
}
