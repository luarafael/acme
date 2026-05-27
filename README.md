# ACME

Aplicação web fullstack em Next.js com API REST para gestão de clientes e persistência em PostgreSQL via Prisma ORM.

---

## Preview

O frontend atual está em estágio inicial e exibe uma tela única com a mensagem de sistema em construção.

- Página principal simples e responsiva com Tailwind CSS
- API já funcional para listagem e criação de clientes
- Base preparada para evoluir para dashboard administrativo

---

## Tecnologias Utilizadas

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5-2d3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8-4b32c3?logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3-f7b93e?logo=prettier&logoColor=black)

| Camada | Tecnologias |
|---|---|
| Frontend | Next.js 15 (App Router), React 18, Tailwind CSS, next/font |
| Backend | Route Handlers do Next.js, Controller + Service, Zod |
| Banco de Dados | PostgreSQL 16, Prisma ORM |
| Infraestrutura | Docker Compose (container de banco) |
| Testes | Não configurado |
| Ferramentas Dev | TypeScript (strict), ESLint, Prettier, tsx |

---

## Arquitetura

Padrão em camadas para API:

- Rota HTTP (App Router) recebe requisição
- Controller valida dados e aplica regras de entrada
- Service executa consultas e mutações no banco
- Prisma Client acessa PostgreSQL

Fluxo resumido:

```mermaid
flowchart LR
	A[Client] --> B[Next Route Handler]
	B --> C[CustomerController]
	C --> D[CustomerService]
	D --> E[(PostgreSQL)]
	D --> F[Prisma Client]
	F --> E
```

---

## Estrutura do Projeto

```bash
.
├── docker-compose.yml
├── package.json
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── customers/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ui/
│   │       ├── fonts.ts
│   │       └── global.css
│   ├── controllers/
│   │   └── CustomerController.ts
│   ├── services/
│   │   └── CustomerService.ts
│   ├── lib/
│   │   └── prisma.ts
│   └── types/
│       └── index.ts
└── tsconfig.json
```

---

## Funcionalidades

- API REST para clientes
- Listagem paginada de clientes
- Busca por nome e e-mail
- Ordenação por campos permitidos
- Criação de clientes com validação de payload (Zod)
- Modelagem de usuários, clientes, faturas e receita mensal
- Seed de dados iniciais para ambiente local

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose

### Instalação

```bash
npm install
```

### Variáveis de ambiente

O projeto usa `DATABASE_URL` para conexão com PostgreSQL.

Crie um arquivo `.env` na raiz do projeto com um valor válido de conexão.

Exemplo compatível com o `docker-compose.yml`:

```env
DATABASE_URL="postgresql://acme_user:acme_password@localhost:5432/acme_database?schema=public"
```

### Executando

1. Suba o banco:

```bash
docker compose up -d database
```

2. Gere o client Prisma e aplique migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

3. (Opcional) Popule com dados iniciais:

```bash
npx prisma db seed
```

4. Inicie a aplicação:

```bash
npm run dev
```

Aplicação local: http://localhost:3000

---

## Scripts disponíveis

Scripts extraídos de `package.json`:

```bash
npm run dev          # Inicia o Next.js em modo desenvolvimento
npm run build        # Gera build de produção
npm run start        # Sobe app com build de produção
npm run lint         # Executa lint com configuração Next.js
npm run format       # Formata o projeto com Prettier
npm run format:check # Verifica formatação sem alterar arquivos
npm run type:check   # Validação de tipos TypeScript
```

---

## Banco de Dados

ORM: Prisma.

Modelos atuais:

- User
- Customer
- Invoice
- Revenue

Comandos úteis:

```bash
npx prisma migrate dev
npx prisma migrate deploy
npx prisma generate
npx prisma studio
npx prisma db seed
```

Migrations versionadas em `prisma/migrations`.

---

## Docker

Existe configuração Docker Compose para banco PostgreSQL:

- Serviço: `database`
- Imagem: `postgres:16`
- Porta: `5432`
- Volume persistente: `postgres_data`
- Healthcheck configurado

Subir ambiente de banco:

```bash
docker compose up -d
```

Parar ambiente:

```bash
docker compose down
```

Observação: não há `Dockerfile` para a aplicação Next.js neste repositório.

---

## API

Padrão: REST (Route Handlers do Next.js).

Base atual:

- `GET /api/customers`
- `POST /api/customers`

Query params suportados em listagem:

- `search` (opcional)
- `pages` (opcional, padrão 1)
- `limit` (opcional, padrão 10)
- `sortBy` (opcional, padrão `name`)
- `order` (opcional, `asc` ou `desc`, padrão `asc`)

Autenticação:

- Não configurada.

---

## Testes

- Framework de testes: não configurado
- Scripts de teste em `package.json`: não encontrados
- Cobertura: não configurada

---

## Deploy

Pipeline de deploy e CI/CD:

- Workflows em `.github`: não encontrados
- Estratégia de deploy: não configurada no repositório

Como é um projeto Next.js, plataformas comuns seriam Vercel, Docker/VPS ou serviços cloud, mas não há configuração oficial versionada para isso neste momento.

---

## Qualidade de Código

- ESLint configurado com `next/core-web-vitals`
- Prettier configurado (`singleQuote: true`, `trailingComma: none`)
- TypeScript em modo `strict`
- Alias de importação via `@/*`
- Husky: não configurado
- lint-staged: não configurado

---

## Segurança

Itens implementados:

- Validação de entrada com Zod no controller
- Tipagem estrita com TypeScript

Itens não configurados atualmente:

- Autenticação/autorização de API
- Rate limiting
- Headers de segurança customizados
- Gestão de segredo além de variável de ambiente local

---

## Performance

Pontos existentes no código:

- Paginação e limite de resultados em clientes
- Busca e ordenação no banco
- Prisma singleton em ambiente de desenvolvimento para evitar múltiplas conexões

---

## Fluxo de Desenvolvimento

1. Subir banco com Docker Compose
2. Garantir `.env` válido com `DATABASE_URL`
3. Executar migrations e generate do Prisma
4. Rodar app com `npm run dev`
5. Validar qualidade com `npm run lint` e `npm run type:check`

---

## Inconsistências Encontradas

- `prisma/seed.ts` importa `userAgent` sem uso
- Não há testes automatizados nem CI/CD configurados

---

## Melhorias Futuras

- Implementar autenticação (ex.: NextAuth/JWT) e autorização por perfil
- Expandir API para update/delete de clientes e documentação OpenAPI
- Adicionar testes unitários/integrados (Vitest/Jest + Supertest)
- Configurar CI com lint, type-check e testes em pull request
- Criar Dockerfile da aplicação para execução full containerizada
- Melhorar UI inicial com páginas de listagem e dashboard

---

## Licença

Não encontrada configuração de licença no repositório.

