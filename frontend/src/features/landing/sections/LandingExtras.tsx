
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react";

import { Logo } from "../../../components/ui/Logo";
import { RegionalArt } from "../components/RegionalArt";

const steps = [
  {
    label: "PARA QUEM PRECISA",
    title: "Precisa de um serviço?",
    icon: Search,
    items: [
      "Pesquise profissionais ou publique uma solicitação.",
      "Compare perfis ou propostas.",
      "Combine os detalhes pelo WhatsApp.",
    ],
    button: "Encontrar profissionais",
  },
  {
    label: "PARA QUEM FAZ",
    title: "Quer divulgar seu trabalho?",
    icon: BriefcaseBusiness,
    items: [
      "Crie sua conta e perfil profissional.",
      "Apresente seus serviços.",
      "Encontre solicitações e envie propostas.",
    ],
    button: "Divulgar meu trabalho",
  },
];

const professionals = [
  {
    name: "João Carlos",
    category: "Eletricista residencial",
    location: "Centro e bairros próximos",
    description: "Instalações, manutenção elétrica e pequenos reparos residenciais.",
    initials: "JC",
    background: "bg-[#DCE7DF]",
  },
  {
    name: "Marina Alves",
    category: "Manicure e cuidados",
    location: "Atendimento em Quixadá",
    description: "Cuidado de unhas e atendimento com hora combinada pelo WhatsApp.",
    initials: "MA",
    background: "bg-[#F5E1CE]",
  },
  {
    name: "Rafael Lima",
    category: "Técnico em informática",
    location: "Quixadá e região",
    description: "Manutenção de computadores, formatação e suporte para o dia a dia.",
    initials: "RL",
    background: "bg-[#DEE6EA]",
  },
];

const questions = [
  {
    question: "O AchaQui é gratuito?",
    answer:
      "Sim. Inicialmente, clientes e profissionais poderão utilizar a plataforma gratuitamente.",
  },
  {
    question: "Como entro em contato com um profissional?",
    answer:
      "A proposta do AchaQui é facilitar o contato pelo WhatsApp, diretamente com o profissional.",
  },
  {
    question: "Como publico uma solicitação?",
    answer:
      "Você poderá descrever o serviço necessário e receber propostas de profissionais cadastrados. Essa funcionalidade está em desenvolvimento.",
  },
  {
    question: "Posso usar a plataforma como cliente e profissional?",
    answer:
      "O sistema está sendo planejado para permitir as duas atividades em uma mesma conta.",
  },
  {
    question: "Como envio uma proposta?",
    answer:
      "Profissionais poderão responder às solicitações informando descrição e valor. A funcionalidade ainda está sendo implementada.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 bg-achaqui-cream py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-achaqui-green">
            Sem complicação
          </p>
          <h2 className="mx-auto mt-3 max-w-lg text-3xl font-medium tracking-tight sm:text-4xl">
            Encontrar ajuda por aqui é simples.
          </h2>
          <p className="mt-3 text-sm text-achaqui-muted">
            Escolha seu caminho e comece a se conectar com gente da cidade.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {steps.map(({ label, title, icon: Icon, items, button }, index) => (
            <article
              key={title}
              className="rounded-2xl border border-achaqui-border bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3 border-b border-achaqui-border pb-5">
                <span className="rounded-xl bg-[#E8F0EA] p-3 text-achaqui-green">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-achaqui-muted">
                    {label}
                  </p>
                  <h3 className="mt-1 text-lg font-medium">{title}</h3>
                </div>
              </div>

              <ol className="mt-6 space-y-5">
                {items.map((item, i) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B9D7C1] text-xs text-achaqui-green">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-6 text-achaqui-muted">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>

              <Link
                to={index === 0 ? "/login" : "/register"}
                className={`mt-7 inline-flex rounded-xl px-5 py-3 text-sm font-semibold ${
                  index === 0
                    ? "border border-achaqui-border text-achaqui-green"
                    : "bg-achaqui-orange text-achaqui-text"
                }`}
              >
                {button}
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-achaqui-muted">
          O contato e a combinação dos serviços acontecem diretamente entre as pessoas.
        </p>
      </div>
    </section>
  );
}

export function ProfessionalsSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-achaqui-green">
          Perfis para conhecer
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
          Profissionais em destaque
        </h2>
        <p className="mt-3 text-sm text-achaqui-muted">
          Exemplos fictícios de como os profissionais aparecerão no AchaQui.
        </p>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {professionals.map((person) => (
            <article
              key={person.name}
              className="overflow-hidden rounded-2xl border border-achaqui-border bg-white shadow-sm"
            >
              <div className={`flex h-44 items-center justify-center ${person.background}`}>
                <div className="flex h-22 w-22 items-center justify-center rounded-full bg-white/80 text-3xl font-semibold text-achaqui-green">
                  {person.initials}
                </div>
              </div>

              <div className="p-5">
                <span className="rounded-full bg-[#E8F0EA] px-3 py-1 text-[10px] font-semibold uppercase text-achaqui-green">
                  Perfil demonstrativo
                </span>

                <h3 className="mt-4 text-xl font-medium">{person.name}</h3>
                <p className="mt-1 text-sm font-semibold text-achaqui-green">
                  {person.category}
                </p>
                <p className="mt-3 flex items-center gap-1 text-xs text-achaqui-muted">
                  <MapPin size={13} /> {person.location}
                </p>
                <p className="mt-3 min-h-18 text-sm leading-6 text-achaqui-muted">
                  {person.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    className="rounded-lg border border-achaqui-border px-3 py-3 text-center text-xs font-semibold text-achaqui-green"
                  >
                    Ver perfil
                  </Link>
                  <span className="flex items-center justify-center gap-1 rounded-lg bg-[#E8F5EA] px-2 py-3 text-center text-xs font-semibold text-achaqui-green">
                    <MessageCircle size={14} />
                    WhatsApp em breve
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RegionalSection() {
  return (
    <section className="bg-[#F4EADF] py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 lg:gap-16">
        <div className="aspect-5/4 overflow-hidden rounded-[40px] bg-[#F7C987]">
          <RegionalArt />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-achaqui-green">
            Feito daqui
          </p>
          <h2 className="mt-4 max-w-lg text-4xl font-medium leading-tight tracking-tight">
            Da nossa cidade, para a nossa gente.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-achaqui-muted">
            O AchaQui nasceu para aproximar quem oferece um bom serviço
            de quem precisa dele. Valorizando o trabalho autônomo e
            fortalecendo as conexões de Quixadá.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-xl border border-achaqui-border bg-white/70 px-4 py-3 text-xs font-semibold text-achaqui-green">
            <MapPin size={15} /> Quixadá, Ceará
          </p>
        </div>
      </div>
    </section>
  );
}

export function ProfessionalsCTA() {
  return (
    <section
      id="para-profissionais"
      className="scroll-mt-20 bg-[#23553D] py-20 text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F9C579]">
            Para profissionais
          </p>
          <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight">
            Seu talento merece ser encontrado.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/75">
            Crie seu perfil, apresente seu trabalho e encontre novas
            oportunidades em Quixadá.
          </p>
        </div>

        <Link
          to="/register"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-achaqui-orange px-6 py-4 text-sm font-semibold text-achaqui-text"
        >
          Quero divulgar meus serviços <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-achaqui-green">
            Dúvidas frequentes
          </p>
          <h2 className="mt-3 max-w-sm text-3xl font-medium tracking-tight sm:text-4xl">
            Antes de começar, talvez você queira saber.
          </h2>
          <p className="mt-4 text-sm leading-6 text-achaqui-muted">
            Não encontrou sua dúvida? A plataforma está em desenvolvimento.
          </p>
        </div>

        <div className="divide-y divide-achaqui-border">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-achaqui-green transition group-open:rotate-180"
                />
              </summary>
              <p className="pt-4 text-sm leading-6 text-achaqui-muted">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1C3F30] px-5 py-12 text-white lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo size="sm" variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
            Um jeito simples e próximo de encontrar e oferecer serviços
            em Quixadá.
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs text-[#F7C987]">
            <MapPin size={14} /> Quixadá — Ceará
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#F7C987]">
            Explore
          </p>
          <nav className="mt-5 flex flex-col gap-3 text-sm text-white/70">
            <a href="#como-funciona">Como funciona</a>
            <a href="#servicos">Serviços</a>
            <a href="#para-profissionais">Para profissionais</a>
          </nav>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#F7C987]">
            Conta
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
            <Link to="/login">Entrar</Link>
            <Link to="/register">Cadastre-se</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#F7C987]">
            Informações
          </p>
          <p className="mt-5 text-sm leading-6 text-white/60">
            Os Termos de Uso e a Política de Privacidade estão em elaboração.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row">
        <p>© {new Date().getFullYear()} AchaQui. Projeto acadêmico.</p>
        <p>
          O AchaQui facilita o contato entre pessoas e não garante a
          execução dos serviços.
        </p>
      </div>
    </footer>
  );
}
