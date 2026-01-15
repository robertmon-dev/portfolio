DOCKER_COMPOSE_FILE = docker/docker-compose.yml
COMPOSE = docker-compose -f $(DOCKER_COMPOSE_FILE)
YARN = yarn

.DEFAULT_GOAL := help
.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# ==========================================
# YARN
# ==========================================

install:
	$(YARN) install

clean:
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
	find . -name "dist" -type d -prune -exec rm -rf '{}' +
	find . -name ".turbo" -type d -prune -exec rm -rf '{}' +
	@echo "Cleared project"

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

# ==========================================
# DEVELOPMENT
# ==========================================

dev:
	$(YARN) dev

build:
	$(YARN) build

lint:
	$(YARN) lint

# ==========================================
# DATABASE
# ==========================================

db-generate:
	cd app && npx prisma generate

prisma-push:
	cd app && npx prisma db push

prisma-migrate:
	cd app && npx prisma migrate dev

prisma-studio:
	cd app && npx prisma studio

# ==========================================
# SHARED
# ==========================================

shared-build:
	cd shared && $(YARN) build

test:
	$(YARN) test
