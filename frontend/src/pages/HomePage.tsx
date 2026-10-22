import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-achaqui-cream p-6">
      <h1 className="text-4xl font-bold text-achaqui-green">
        Bem-vindo ao AchaQui!
      </h1>

      <p className="mt-4 text-achaqui-muted">
        Sua plataforma de serviços em Quixadá.
      </p>

      <Link
        to="/login"
        className="mt-6 rounded-xl bg-achaqui-green px-6 py-3 text-white"
      >
        Voltar ao login
      </Link>
    </main>
  );
}