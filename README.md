# AchaQui

Plataforma web para conectar profissionais autônomos e clientes na região de **Quixadá, Ceará**.

O AchaQui tem como objetivo facilitar a divulgação de serviços locais e aproximar profissionais de pessoas que precisam contratar seus serviços.

O sistema utiliza um modelo híbrido: além de pesquisar profissionais cadastrados, os clientes poderão publicar solicitações e receber propostas de diferentes prestadores.

## Tecnologias utilizadas

| Camada | Tecnologias |
|---|---|
| Frontend | React, Vite, TypeScript, Tailwind CSS |
| Navegação | React Router |
| Formulários | React Hook Form, Zod |
| Requisições HTTP | Axios |
| Backend | Node.js, Express, TypeScript |
| Autenticação | JWT, Argon2 |
| Banco de dados | PostgreSQL |
| ORM | Prisma 7 |
| Infraestrutura local | Docker Compose |
| Gerenciamento de dependências | npm workspaces |

## Estrutura do projeto

O AchaQui utiliza um **monorepositório**, reunindo frontend, backend e documentação.

```text
achaqui/
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       │   └── ui/
│       ├── features/
│       │   └── auth/
│       │       ├── api/
│       │       ├── components/
│       │       ├── hooks/
│       │       ├── pages/
│       │       ├── schemas/
│       │       └── types/
│       ├── lib/
│       ├── pages/
│       ├── main.tsx
│       └── index.css
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   └── src/
│       ├── config/
│       ├── generated/
│       ├── lib/
│       ├── middlewares/
│       ├── modules/
│       │   └── auth/
│       ├── app.ts
│       └── server.ts
│
├── docs/
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

## Funcionalidades

### Implementadas

- [x] Estrutura inicial do monorepositório
- [x] Configuração do frontend com React, Vite e TypeScript
- [x] Configuração do Tailwind CSS
- [x] Configuração do backend com Express e TypeScript
- [x] Configuração do PostgreSQL com Docker Compose
- [x] Integração do Prisma com PostgreSQL
- [x] Criação da entidade `Usuario` e migration inicial
- [x] Cadastro de usuários com validação Zod
- [x] Armazenamento seguro das senhas com Argon2
- [x] Login com geração de JWT
- [x] Middleware de autenticação JWT
- [x] Implementação da rota protegida `/api/auth/me`
- [x] Estrutura de navegação no React Router
- [x] Componentes visuais reutilizáveis de autenticação
- [x] Telas responsivas de Login e Cadastro
- [x] Integração inicial dos formulários com a API

### Em validação

- [ ] Confirmar o fluxo completo de login e redirecionamento
- [ ] Validar a rota `/api/auth/me` com tokens válidos e inválidos
- [ ] Validar mensagens de erro e carregamento dos formulários
- [ ] Revisar a responsividade em diferentes dispositivos

### Pendentes

- [ ] Gerenciamento de sessão no frontend com AuthProvider
- [ ] Persistência segura da sessão e tratamento de expiração do JWT
- [ ] Rotas protegidas no frontend
- [ ] Recuperação de senha
- [ ] Cadastro e gerenciamento de perfis profissionais
- [ ] Categorias de serviços
- [ ] Catálogo e pesquisa de profissionais
- [ ] Publicação de solicitações
- [ ] Envio e gerenciamento de propostas
- [ ] Aceite de múltiplas propostas
- [ ] Integração de contato com WhatsApp
- [ ] Landing page
- [ ] Testes automatizados e documentação complementar
- [ ] Deploy da aplicação

## Regras de negócio

As principais regras definidas para o AchaQui são:

1. A plataforma será inicialmente gratuita.
2. Clientes poderão pesquisar profissionais ou publicar solicitações de serviços.
3. Todos os profissionais cadastrados poderão visualizar solicitações abertas.
4. Profissionais com perfil ativo poderão enviar propostas independentemente da categoria.
5. As propostas deverão conter valor e descrição obrigatórios.
6. Uma solicitação poderá receber e aceitar múltiplas propostas.
7. O contato entre cliente e profissional acontecerá pelo WhatsApp.
8. O encerramento da solicitação será confirmado manualmente pelo cliente.

---

# Como executar o projeto

## Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- Node.js e npm
- Git
- Docker Desktop com Docker Compose
- Um editor de código, como VS Code

O Docker Desktop precisa estar iniciado para que o PostgreSQL funcione.

## 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/achaqui.git
cd achaqui
```

Substitua `SEU-USUARIO` pelo proprietário do repositório.

## 2. Instalar as dependências

Na raiz do projeto:

```bash
npm install
```

O projeto utiliza npm workspaces, portanto esse comando instala as dependências do frontend e backend.

## 3. Configurar o PostgreSQL

O banco de dados é executado em um contêiner Docker.

Na raiz do projeto:

```bash
docker compose up -d
```

Verifique se o serviço foi iniciado:

```bash
docker compose ps
```

O esperado é que o contêiner `achaqui-postgres` esteja com status `healthy`.

O banco fica acessível localmente em:

```text
Host: localhost
Porta: 5432
Banco: achaqui
```

As credenciais utilizadas devem corresponder às definidas no arquivo `docker-compose.yml`.

## 4. Configurar variáveis de ambiente

Crie o arquivo `backend/.env`, utilizando o `.env.example` como referência, quando disponível.

Exemplo para desenvolvimento local:

```env
DATABASE_URL="postgresql://achaqui:achaqui_dev@localhost:5432/achaqui?schema=public"
JWT_SECRET="SUA_CHAVE_SECRETA_SEGURA"
JWT_EXPIRES_IN="15m"
```

A URL deve corresponder à configuração do PostgreSQL utilizada no Docker Compose.

Para gerar uma chave JWT segura:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Substitua `SUA_CHAVE_SECRETA_SEGURA` pelo valor gerado.

**Nunca envie o arquivo `.env` para o GitHub.**

## 5. Configurar o banco com Prisma

Entre na pasta do backend:

```bash
cd backend
```

Aplique as migrations existentes:

```bash
npx prisma migrate deploy
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Depois, retorne à raiz do projeto:

```bash
cd ..
```

O comando `migrate deploy` aplica migrations já versionadas, enquanto `migrate dev` deve ser utilizado durante o desenvolvimento de alterações no modelo de dados.

## 6. Iniciar frontend e backend

Na raiz do projeto, execute:

```bash
npm run dev
```

Esse comando inicia os dois serviços simultaneamente.

| Serviço | Endereço |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3333 |
| PostgreSQL | localhost:5432 |

Mantenha o terminal aberto durante a execução.

## 7. Acessar a aplicação

As interfaces atualmente disponíveis são:

| Página | Endereço |
|---|---|
| Login | http://localhost:5173/login |
| Cadastro | http://localhost:5173/register |
| Página inicial provisória | http://localhost:5173/ |

A página inicial ainda está em desenvolvimento.

## 8. Endpoints da autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Cadastrar usuário |
| POST | `/api/auth/login` | Autenticar e gerar JWT |
| GET | `/api/auth/me` | Consultar usuário autenticado |

### Exemplo de cadastro

**POST** `http://localhost:3333/api/auth/register`

```json
{
  "nome": "Usuário Teste",
  "email": "teste@exemplo.com",
  "senha": "SenhaSegura123!"
}
```

### Exemplo de login

**POST** `http://localhost:3333/api/auth/login`

```json
{
  "email": "teste@exemplo.com",
  "senha": "SenhaSegura123!"
}
```

Em caso de sucesso, a API retorna os dados públicos do usuário e um access token JWT.

### Consultar usuário autenticado

**GET** `http://localhost:3333/api/auth/me`

Envie no cabeçalho:

```http
Authorization: Bearer SEU_ACCESS_TOKEN
```

O access token possui validade inicial de 15 minutos.

**Observação:** embora o login já gere JWT, o gerenciamento de sessão no frontend ainda está pendente. Portanto, a interface ainda não mantém automaticamente o usuário autenticado entre navegações.

---

# Comandos úteis

| Comando | Finalidade |
|---|---|
| `npm install` | Instalar dependências |
| `npm run dev` | Executar frontend e backend |
| `docker compose up -d` | Iniciar PostgreSQL |
| `docker compose ps` | Consultar status dos contêineres |
| `docker compose down` | Parar e remover os contêineres, preservando os volumes |
| `npx prisma migrate dev --name nome` | Criar migration durante o desenvolvimento |
| `npx prisma migrate deploy` | Aplicar migrations existentes |
| `npx prisma generate` | Gerar Prisma Client |
| `npx prisma studio` | Visualizar dados do banco |
| `npx tsc --noEmit` | Verificar erros de TypeScript |

Os comandos Prisma devem ser executados dentro da pasta `backend`.

---

# Problemas comuns

### Docker não está funcionando

Se aparecer:

```text
failed to connect to the docker API
```

Abra o Docker Desktop e aguarde o Docker Engine iniciar. Depois execute novamente:

```bash
docker compose up -d
```

### Erro ECONNREFUSED no backend

Geralmente indica que o serviço PostgreSQL não está acessível ou que a configuração de conexão está incorreta.

Verifique:

```bash
docker compose ps
```

Confirme também as informações de `DATABASE_URL`.

### Frontend não consegue acessar a API

Verifique se o backend está rodando na porta `3333` e se o proxy `/api` está configurado no arquivo `frontend/vite.config.ts`.

### Login funciona na API, mas não redireciona corretamente

Confira se a rota `/` existe no React Router.

O gerenciamento completo do estado autenticado ainda está pendente.

---

# Próximas etapas

A prioridade atual é concluir a integração da autenticação no frontend e avançar para as funcionalidades essenciais do MVP.

Ordem de desenvolvimento sugerida:

1. Finalizar autenticação e gerenciamento de sessão no frontend.
2. Implementar perfis profissionais.
3. Implementar categorias e catálogo de serviços.
4. Desenvolver publicação de solicitações.
5. Implementar envio e aceite de propostas.
6. Integrar contato via WhatsApp.
7. Finalizar landing page e responsividade.
8. Executar testes, corrigir problemas e preparar o deploy.

---

## Status do projeto

**Em desenvolvimento — MVP acadêmico.**

O AchaQui já possui uma base técnica executável, banco PostgreSQL, autenticação inicial com JWT e interfaces responsivas de Login e Cadastro.

As funcionalidades centrais de conexão entre clientes e profissionais ainda estão em desenvolvimento.

**Prazo planejado de entrega:** 25 de outubro de 2026.

---

Desenvolvido como projeto acadêmico, com foco na valorização de profissionais autônomos e na conexão entre pessoas da região de Quixadá–CE.