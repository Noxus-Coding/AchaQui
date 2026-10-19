import { useEffect, useState } from 'react';

type Health = { status: string; service: string };

export default function App() {
  const [api, setApi] = useState('Verificando conexão com a API...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => { if (!res.ok) throw new Error('Falha na API'); return res.json() as Promise<Health>; })
      .then((data) => setApi(data.status === 'ok' ? 'API conectada' : 'API indisponível'))
      .catch(() => setApi('API indisponível'));
  }, []);

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <span className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Quixadá · Ceará</span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">AchaQui</h1>
        <p className="mt-4 text-lg text-slate-600">Conectando profissionais autônomos e clientes da região.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-emerald-50 p-5"><h2 className="font-semibold">Encontre profissionais</h2><p className="mt-2 text-sm text-slate-600">Em breve: catálogo e busca por serviços.</p></div>
          <div className="rounded-xl bg-slate-100 p-5"><h2 className="font-semibold">Publique uma solicitação</h2><p className="mt-2 text-sm text-slate-600">Em breve: receba propostas pela plataforma.</p></div>
        </div>
        <p className="mt-8 text-sm text-slate-500">Status do backend: <strong>{api}</strong></p>
      </div>
    </main>
  );
}
