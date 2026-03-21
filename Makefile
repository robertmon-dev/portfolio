COMPOSE = docker-compose -f docker/docker-compose.yml
YARN    = yarn
TURBO   = npx turbo
CYAN  := \033[36m
RESET := \033[0m

.DEFAULT_GOAL := help

# ==============================================================================
# Utility
# ==============================================================================

.PHONY: help
help: ## Display this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(CYAN)%-30s$(RESET) %s\n", $$1, $$2}'

# ==============================================================================
# Setup & Maintenance
# ==============================================================================

.PHONY: install
install: ## Install all monorepo dependencies
	@echo "=> Installing monorepo dependencies..."
	@$(YARN) install
	@echo "=> Installation complete."

.PHONY: clean
clean: ## Remove build artifacts and turbo cache
	@echo "=> Cleaning build artifacts and turbo cache..."
	@$(TURBO) run clean
	@rm -rf .turbo
	@echo "=> Clean complete."

.PHONY: nuke
nuke: ## Radical cleanup (node_modules, locks, and dist folders)
	@echo "=> Nuking project (removing everything except source)..."
	@rm -rf node_modules **/node_modules
	@rm -rf **/dist .turbo yarn.lock
	@echo "=> Project nuked. Run 'make install' to start over."

# ==============================================================================
# Development & Build (Turbo)
# ==============================================================================

.PHONY: dev
dev: db-generate ## Start all services in development mode (Turbo)
	@echo "=> Starting development servers..."
	@$(TURBO) run dev

.PHONY: build
build: clean db-generate ## Build all packages (Shared -> App -> Client)
	@echo "=> Building all packages..."
	@$(TURBO) run build
	@echo "=> Build complete."

.PHONY: dashboard
dashboard: db-generate ## Launch mprocs development dashboard
	@echo "=> Launching mprocs dashboard..."
	@mprocs

# ==============================================================================
# Docker (Infrastructure & App)
# ==============================================================================

.PHONY: up
up: ## Start Docker containers (with build)
	@echo "=> Starting Docker stack..."
	@$(COMPOSE) up -d --build
	@echo "=> Stack is up and running."

.PHONY: down
down: ## Stop Docker containers
	@echo "=> Stopping Docker stack..."
	@$(COMPOSE) down

.PHONY: logs
logs: ## Follow Docker container logs
	@$(COMPOSE) logs -f

# ==============================================================================
# Database (Prisma)
# ==============================================================================

.PHONY: db-generate
db-generate: ## Generate Prisma client in @portfolio/app
	@echo "=> Generating Prisma client..."
	@$(YARN) workspace @portfolio/app prisma generate

.PHONY: db-push
db-push: ## Sync schema with database (push)
	@echo "=> Pushing schema to database..."
	@$(YARN) workspace @portfolio/app prisma db push

.PHONY: db-migrate
db-migrate: ## Create a new Prisma migration
	@echo "=> Creating prisma migration..."
	@$(YARN) workspace @portfolio/app prisma migrate dev

.PHONY: db-studio
db-studio: ## Launch Prisma Studio
	@echo "=> Opening Prisma Studio..."
	@$(YARN) workspace @portfolio/app prisma studio

.PHONY: db-seed
db-seed: ## Seed the database with initial data
	@echo "=> Seeding database..."
	@$(YARN) workspace @portfolio/app prisma db seed
