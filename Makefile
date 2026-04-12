# ==============================================================================
# Portfolio Monorepo Makefile
# ==============================================================================

COMPOSE_FULL  = docker compose -f docker/docker-compose.yml
COMPOSE_LOCAL = docker compose -f docker/docker-compose.local.yml
YARN          = yarn
TURBO         = yarn turbo

REGISTRY      ?= ghcr.io
IMAGE_PREFIX  ?= robertmon-dev/portfolio
TAG           ?= latest

CYAN  := \033[36m
RESET := \033[0m

.DEFAULT_GOAL := help
VITE_API_URL ?= http://localhost:8800

# ==============================================================================
# Utility
# ==============================================================================

.PHONY: help
help: ## Display this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(CYAN)%-30s$(RESET) %s\n", $$1, $$2}'

# ==============================================================================
# Setup & Maintenance
# ==============================================================================

.PHONY: setup
setup: ## Full project orchestration (Install -> Infra -> Build -> DB Setup)
	@echo "$(CYAN)=> Running full project setup...$(RESET)"
	@$(MAKE) install
	@$(MAKE) infra-up
	@echo "$(CYAN)=> Generating Prisma client...$(RESET)"
	@$(MAKE) build
	@echo "$(CYAN)=> Waiting for database to be ready...$(RESET)"
	@$(MAKE) db-generate
	@echo "$(CYAN)=> Building all packages (ensuring shared is ready)...$(RESET)"
	@sleep 3
	@$(MAKE) db-push
	@$(MAKE) db-seed
	@echo "$(GREEN)=> Setup complete! Run 'make dev' to start development.$(RESET)"

# ==============================================================================
# CI/CD & Registry (GitHub Actions)
# ==============================================================================

.PHONY: docker-build-ci
docker-build-ci: ## Build images for production (CI only)
	@echo "=> Building production images for $(TAG)..."
	@echo "=> Using API URL: $(VITE_API_URL)"
	@docker build -t $(REGISTRY)/$(IMAGE_PREFIX)-app:$(TAG) -f docker/Dockerfile.app .
	@docker build \
		--build-arg VITE_API_URL=$(VITE_API_URL) \
		-t $(REGISTRY)/$(IMAGE_PREFIX)-client:$(TAG) \
		-f docker/Dockerfile.client .

.PHONY: docker-push
docker-push: ## Push production images to registry
	@echo "=> Pushing images to $(REGISTRY)..."
	@docker push $(REGISTRY)/$(IMAGE_PREFIX)-app:$(TAG)
	@docker push $(REGISTRY)/$(IMAGE_PREFIX)-client:$(TAG)

.PHONY: docker-login
docker-login: ## Login to GitHub Container Registry
	@echo "=> Logging in to $(REGISTRY)..."
	@echo $${GITHUB_TOKEN} | docker login $(REGISTRY) -u $${GITHUB_ACTOR} --password-stdin

# ==============================================================================
# Quality
# ==============================================================================

.PHONY: lint
lint: ## Run ESLint across the monorepo
	@echo "=> Running linter..."
	@$(TURBO) run lint
	@echo "=> Lint complete."

.PHONY: lint-fix
lint-fix: ## Run ESLint with autofix where supported
	@echo "=> Running linter with autofix..."
	@$(TURBO) run lint:fix
	@echo "=> Lint fix complete."
	@echo "$(GREEN)=> Setup complete! Run 'make dev' to start development.$(RESET)"


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
dev: db-generate ## Start dev servers. Set NO_AUTOMATIONS=1 to skip background tasks.
	@if [ "$(NO_AUTOMATIONS)" = "1" ]; then \
		echo "$(YELLOW)=> Starting Core Services only (API + Client)$(NC)"; \
		export NO_AUTOMATIONS=1; \
		$(TURBO) run dev --filter=@portfolio/app --filter=@portfolio/client --filter=@portfolio/shared; \
	else \
		echo "$(GREEN)=> Starting Full Stack Development...$(NC)"; \
		$(TURBO) run dev; \
	fi

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
# Docker (Full Stack)
# ==============================================================================

.PHONY: up
up: ## Start Full Docker stack (DB, Redis, App, Client)
	@echo "=> Starting Full Docker stack..."
	@$(COMPOSE_FULL) up -d --build
	@echo "=> Full stack is up and running."

.PHONY: down
down: ## Stop Full Docker stack
	@echo "=> Stopping Full Docker stack..."
	@$(COMPOSE_FULL) down

.PHONY: logs
logs: ## Follow Full stack logs
	@$(COMPOSE_FULL) logs -f

# ==============================================================================
# Infrastructure (DB & Redis only)
# ==============================================================================

.PHONY: infra-up
infra-up: ## Start only local infrastructure (Postgres & Redis)
	@echo "=> Starting local infrastructure..."
	@$(COMPOSE_LOCAL) up -d
	@echo "=> Infrastructure is ready."

.PHONY: infra-down
infra-down: ## Stop local infrastructure
	@echo "=> Stopping local infrastructure..."
	@$(COMPOSE_LOCAL) down

.PHONY: infra-logs
infra-logs: ## Follow infrastructure logs
	@$(COMPOSE_LOCAL) logs -f

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

# ==============================================================================
# CI/CD & Registry (GitHub Actions)
# ==============================================================================

.PHONY: docker-build-ci
docker-build-ci: ## Build images for production (CI only)
	@echo "=> Building production images for $(TAG)..."
	@docker build -t $(REGISTRY)/$(IMAGE_PREFIX)-app:$(TAG) -f docker/Dockerfile.app .
	@docker build -t $(REGISTRY)/$(IMAGE_PREFIX)-client:$(TAG) -f docker/Dockerfile.client .

.PHONY: docker-push
docker-push: ## Push production images to registry
	@echo "=> Pushing images to $(REGISTRY)..."
	@docker push $(REGISTRY)/$(IMAGE_PREFIX)-app:$(TAG)
	@docker push $(REGISTRY)/$(IMAGE_PREFIX)-client:$(TAG)

.PHONY: docker-login
docker-login: ## Login to GitHub Container Registry
	@echo "=> Logging in to $(REGISTRY)..."
	@echo $${GITHUB_TOKEN} | docker login $(REGISTRY) -u $${GITHUB_ACTOR} --password-stdin

.PHONY: prod-update
prod-update: ## Pull new images and restart (Used on server)
	@echo "=> Updating production stack..."
	@$(COMPOSE_FULL) pull
	@$(COMPOSE_FULL) up -d
	@docker image prune -f
	@echo "=> Update complete."

# ==============================================================================
# Quality
# ==============================================================================

.PHONY: lint
lint: ## Run ESLint across the monorepo
	@echo "=> Running linter..."
	@$(TURBO) run lint
	@echo "=> Lint complete."

.PHONY: lint-fix
lint-fix: ## Run ESLint with autofix where supported
	@echo "=> Running linter with autofix..."
	@$(TURBO) run lint:fix
	@echo "=> Lint fix complete."

.PHONY: test
test: ## Run tests across the monorepo
	@echo "=> Running tests..."
	@$(TURBO) run test
