# AchaQui

**AchaQui** é uma plataforma web responsiva em desenvolvimento para conectar profissionais autônomos e clientes em **Quixadá–CE**. Projeto acadêmico com entrega prevista para **25/10/2026**.

## Objetivo

Facilitar a descoberta de profissionais locais e a divulgação de serviços, além de permitir que clientes publiquem solicitações e recebam propostas de profissionais.

## Funcionamento planejado

- **Catálogo:** o cliente pesquisa e consulta perfis de profissionais e poderá entrar em contato por WhatsApp.
- **Solicitações:** o cliente publica o serviço de que precisa; profissionais com perfil ativo podem consultar todas as solicitações abertas e enviar propostas.
- **Propostas:** descrição e valor são obrigatórios. O cliente pode aceitar mais de uma proposta para a mesma solicitação.
- **Conclusão:** o cliente confirma manualmente o encerramento da solicitação.
- **Monetização:** gratuita na versão inicial.

> Esses itens são **requisitos planejados**, ainda não implementados no código inicial.

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, TypeScript |
| Backend | Node.js, Express (base inicial), TypeScript |
| Banco de dados | A definir |
| Organização | npm workspaces (monorepositório) |

## Estrutura

```text
achaqui/
├── frontend/          # React + Vite + Tailwind CSS
│   └── src/
├── backend/           # API Node.js + Express
│   └── src/
├── docs/              # Requisitos, regras e fluxos
├── package.json       # Scripts gerais e workspaces
├── .gitignore
└── README.md
```

## Executar localmente

**Pré-requisito:** Node.js 20.19+ e npm (recomendado Node.js 22 LTS).

```bash
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3333
- Verificação da API: http://localhost:3333/api/health

Para executar separadamente:

```bash
npm run dev -w frontend
npm run dev -w backend
```

Outros comandos:

```bash
npm run typecheck
npm run build
```

As configurações de exemplo estão em `frontend/.env.example` e `backend/.env.example`. Quando necessárias, copie-as para `.env` em cada aplicação. **Não versione arquivos `.env` nem credenciais.**

## Status do projeto

- [x] Estrutura inicial do monorepositório
- [x] Página inicial provisória
- [x] Rota de saúde da API (`GET /api/health`)
- [ ] Banco de dados e modelos
- [ ] Autenticação e perfis profissionais
- [ ] Catálogo e pesquisa
- [ ] Solicitações e propostas
- [ ] Contato por WhatsApp
- [ ] Testes de integração e deploy

## Documentação

- [Requisitos](docs/requisitos.md)
- [Regras de negócio](docs/regras-de-negocio.md)
- [Fluxos](docs/fluxos.md)

## Colaboração

Criar branches por tarefa (`feat/...`, `fix/...`, `docs/...`) e abrir pull requests para revisão. Preferir mensagens de commit em português, por exemplo:

```bash
git commit -m "chore: configura monorepositório com React e Node.js"
```

## Licença

A definir pela equipe.
