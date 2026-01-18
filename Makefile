DOCKER_COMPOSE_FILE = docker/docker-compose.yml
COMPOSE = docker-compose -f $(DOCKER_COMPOSE_FILE)
YARN = yarn

CYAN = \033[36m
RESET = \033[0m

.DEFAULT_GOAL := help

.PHONY: help install nuke clean clean-artifacts up down restart logs build-docker infra-up infra-down infra-logs dev build lint test db-generate db-push db-migrate db-studio db-reset shared-build dashboard

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(CYAN)%-30s$(RESET) %s\n", $$1, $$2}'

# ==========================================
# PACKAGES
# ==========================================

install:
	$(YARN) install

nuke:
	rm -rf node_modules
	rm -rf app/node_modules
	rm -rf client/node_modules
	rm -rf shared/node_modules
	rm -rf app/dist
	rm -rf client/dist
	rm -rf shared/dist
	rm -rf .turbo
	rm -f yarn.lock
	@echo "Project nuked."

clean: clean-artifacts
	rm -rf app/dist
	rm -rf client/dist
	rm -rf shared/dist
	@echo "Cleared dist folders"

clean-artifacts:
	find . -type f \( -name "*.js" -o -name "*.d.ts" -o -name "*.js.map" \) \
		-not -path "*/node_modules/*" \
		-not -path "*/dist/*" \
		-not -path "*/build/*" \
		-not -path "*/.git/*" \
		-not -name "vite.config.js" \
		-not -name "eslint.config.js" \
		-not -name "postcss.config.js" \
		-not -name "tailwind.config.js" \
		-delete

# ==========================================
# DOCKER
# ==========================================

up:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

restart: down up

logs:
	$(COMPOSE) logs -f

build-docker:
	$(COMPOSE) build --no-cache

infra-up:
	docker-compose -f docker/docker-compose.local.yml up -d

infra-down:
	docker-compose -f docker/docker-compose.local.yml down

infra-logs:
	docker-compose -f docker/docker-compose.local.yml logs -f

# ==========================================
# DEVELOPMENT
# ==========================================

dev: db-generate
	$(YARN) dev

build: clean-artifacts db-generate
	$(YARN) build

lint:
	$(YARN) lint

test:
	$(YARN) test

dashboard: clean-artifacts db-generate
	mprocs

shared-build:
	cd shared && $(YARN) build

# ==========================================
# DATABASE (PRISMA)
# ==========================================

db-generate:
	cd app && npx prisma generate

db-push:
	cd app && npx prisma db push

db-migrate:
	cd app && npx prisma migrate dev

db-studio:
	cd app && npx prisma studio

db-reset:
	cd app && npx prisma migrate reset
