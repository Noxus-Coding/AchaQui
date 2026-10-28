
import { Link } from "react-router-dom";
import { MapPin, MessageCircle, UserRound } from "lucide-react";

import type { Profissional } from "../types/profissional.types";
import { criarLinkWhatsapp } from "../utils/whatsapp";

interface ProfissionalCardProps {
  profissional: Profissional;
}

export function ProfissionalCard({
  profissional,
}: ProfissionalCardProps) {
  const whatsappUrl = criarLinkWhatsapp(profissional.whatsapp);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-achaqui-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-52 items-center justify-center overflow-hidden bg-[#E8F0EA]">
        {profissional.fotoUrl ? (
          <img
            src={profissional.fotoUrl}
            alt={`Foto de ${profissional.nomeProfissional}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80">
            <UserRound size={40} className="text-achaqui-green" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {profissional.categorias.map((categoria) => (
            <span
              key={categoria.id}
              className="rounded-full bg-[#E8F0EA] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-achaqui-green"
            >
              {categoria.nome}
            </span>
          ))}
        </div>

        <h3 className="mt-4 text-xl font-medium text-achaqui-text">
          {profissional.nomeProfissional}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-achaqui-muted">
          <MapPin size={14} className="shrink-0" />
          {profissional.bairro}, Quixadá - CE
        </p>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-achaqui-muted">
          {profissional.descricao}
        </p>

        <div className="mt-auto grid grid-cols-1 gap-2 pt-6 sm:grid-cols-2">
          <Link
            to={`/profissionais/${profissional.id}`}
            className="flex min-h-11 items-center justify-center rounded-xl border border-achaqui-border px-3 py-3 text-center text-xs font-semibold text-achaqui-green transition hover:border-achaqui-green"
          >
            Ver perfil
          </Link>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D8EADD] bg-[#E8F5EC] px-3 py-3 text-center text-xs font-semibold text-achaqui-green transition hover:bg-[#D9EDDF]"
            >
              <MessageCircle size={15} />
              Conversar no WhatsApp
            </a>
          ) : (
            <span className="flex min-h-11 items-center justify-center rounded-xl bg-gray-100 px-3 py-3 text-center text-xs text-achaqui-muted">
              Contato indisponível
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
