# portfolio

**portfolio** is a full-stack personal website and blog platform, built as a TypeScript monorepo with a tRPC + Prisma backend and a React + Vite frontend. It was designed for type-safety end-to-end, fast local iteration, and a self-contained Docker deployment.

## Preview

## Key Features

* **End-to-End Type Safety:** The `client`, `app`, and `shared` packages share Zod schemas and tRPC contracts, so request/response types flow from the database to the UI without manual syncing.
* **Blog & Content Engine:** Posts, comments, and reactions, backed by Postgres via Prisma and cached/queued through Redis + BullMQ (e.g. the views-counter service).
* **Authentication & Authorization:** JWT-based auth with Argon2 password hashing and a permission-guarded Admin panel (CRUD tabs per entity, route guards).
* **Background Jobs & Email:** Scheduled tasks via `node-cron`, async job processing via BullMQ, and transactional email via `nodemailer` + React Email templates.
* **Observability:** Structured logging with Pino and Prometheus metrics via `prom-client`.
* **Self-Documenting API:** tRPC routes are exposed as OpenAPI via `trpc-to-openapi`, with interactive docs served through Scalar.
* **i18n:** Backend (`i18n`) and frontend (`react-i18next`) localization, English and Polish (with Polish plural forms).
* **Turborepo Build Pipeline:** Cached, dependency-aware builds/dev/lint tasks across all workspaces via Turbo.

## Installation

### Requirements
* [Node.js](https://nodejs.org/) (18+) and [Yarn](https://yarnpkg.com/) (`1.22.x`, classic)
* [Docker](https://www.docker.com/) and Docker Compose (for Postgres/Redis, or the full stack)
* `make` (the project is driven by a `Makefile`)

### Build and Installation
The project includes a `Makefile` that orchestrates install, infra, build, and database setup:

```bash
git clone https://github.com/Moniev/portfolio.git
cd portfolio

make setup
```

`make setup` installs dependencies, starts local Postgres/Redis, builds all workspaces, generates the Prisma client, pushes the schema, and seeds the database.

Start development afterwards with:

```bash
make dev
```

### Other useful targets
* `make dashboard` — launch an `mprocs` dashboard running infra, app, and client together
* `make dev:app` / `make dev:client` — run a single workspace via Turbo filters
* `make up` / `make down` — start/stop the full Docker stack (Postgres, Redis, app, client, nginx)
* `make db-studio` — launch Prisma Studio
* `make build` — build all packages (shared -> app -> client)
* `make clean` / `make nuke` — remove build artifacts, or wipe `node_modules`/locks/dist entirely

Run `make help` to list every available target.

## Configuration

### Environment Variables
The app reads configuration from a `.env` file at the repo root (consumed by Prisma and the `@portfolio/app` server):

```bash
DATABASE_URL="postgresql://<user>:<password>@localhost:51214/<db>?schema=public"
GITHUB_TOKEN="<github token, used for octokit integration>"
NODE_ENV="development"
PORT="8800"
LOG_LEVEL="info"
NICKNAME="<display name>"
```

For the full Docker stack (`docker/docker-compose.yml`), `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `DB_EXTERNAL_PORT` configure the Postgres container, and `VITE_API_URL` is baked into the client build.

## Project Structure

```text
├── app/                  # @portfolio/app — tRPC server + Prisma
│   ├── prisma/
│   └── src/
│       ├── contract.ts
│       ├── core/
│       ├── infrastructure/
│       ├── routers/      # public / private / diagnostics
│       ├── services/
│       └── trpc/
├── client/               # @portfolio/client — React + Vite + tRPC
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── locales/      # en / pl
│       └── pages/        # About, Admin, Blog, Contact, Post, Projects, ...
├── shared/                # @portfolio/shared — Zod schemas & shared types
├── docker/                # Dockerfiles, nginx conf, compose files
├── Makefile               # setup, dev, build, docker, db targets
├── mprocs.yaml             # dev dashboard (infra + app + client)
└── turbo.json               # Turborepo task graph
```

## Development and Testing

The monorepo is orchestrated with Turborepo and Yarn workspaces.

* **Run tests:** `yarn turbo run test` (e.g. `app` uses Vitest)
* **Run linter:** `make lint` / `make lint-fix`
* **Generate Prisma client:** `make db-generate`
* **Create a migration:** `make db-migrate`

## Support

The server logs structured output via Pino (`LOG_LEVEL` controls verbosity) and exposes Prometheus metrics for monitoring. For local debugging, run `make dashboard` to watch infra, app, and client logs together in one `mprocs` view.
