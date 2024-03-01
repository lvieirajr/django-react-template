# Paths
backend_path=./backend/
frontend_path=./frontend/

# Backend services
api_service=api
worker_service=worker

# Frontend services
frontend_service=frontend


# ======================================================================================
# Docker
# ======================================================================================
.PHONY: docker-compose-run
docker-compose-run: ##@Docker Runs a command on Docker Compose
	@docker compose run --remove-orphans --rm --use-aliases $(options) $(service) $(cmd)

.PHONY: build
build: ##@Docker Builds a Docker Compose service
	@docker compose build $(options) $(service)

.PHONY: start
start: ##@Docker Starts a Docker Compose service
	@docker compose up --abort-on-container-exit --attach-dependencies --remove-orphans $(options) $(service)

.PHONY: stop
stop: ##@Docker Stops a Docker Compose service
	@docker compose down --remove-orphans --timeout 1 $(options) $(service)

.PHONY: debug
debug: ##@Docker Debugs a Docker Compose service
	@$(MAKE) docker-compose-run options="--service-ports" $(service)

.PHONY: shell
shell: ##@Docker Shells into a Docker Compose service
	@$(MAKE) docker-compose-run $(service) cmd="bash"


# ======================================================================================
# Backend
# ======================================================================================
.PHONY: build-backend
build-backend: ##@Backend Builds the backend docker image
	@$(MAKE) build service="$(api_service) $(worker_service)"

.PHONY: start-backend
start-backend: ##@Backend Starts the backend
	@$(MAKE) start service="$(api_service)"

.PHONY: stop-backend
stop-backend: ##@Backend Stops the backend
	@$(MAKE) stop service="$(api_service)"

.PHONY: debug-api
debug-api: ##@Backend Runs the API in debug mode
	@$(MAKE) debug service="$(api_service)"

.PHONY: debug-worker
debug-worker: ##@Backend Runs the Worker in debug mode
	@$(MAKE) debug service="$(worker_service)"

.PHONY: shell-backend
shell-backend: ##@Backend Shells into the backend container
	@$(MAKE) shell service="$(api_service)"

.PHONY: ipython
ipython: ##@Backend Starts an IPython shell
	@$(MAKE) docker-compose-run service="$(api_service)" cmd="python manage.py shell_plus"

.PHONY: poetry-lock
poetry-lock: ##@Backend Creates lock file with updated python dependencies
	@$(MAKE) docker-compose-run options="--no-deps $(options)" service="$(api_service)" cmd="poetry lock"

.PHONY: show-urls
show-urls: ##@Backend Shows the URLs available on the API
	@$(MAKE) docker-compose-run options="--no-deps $(options)" service="$(api_service)" cmd="python manage.py show_urls"

.PHONY: clear-cache
clear-cache: ##@Backend Clears the cache
	@$(MAKE) docker-compose-run options="--no-deps $(options)" service="$(api_service)" cmd="python manage.py clear_cache"

.PHONY: reset-database
reset-database: ##@Backend Resets database to an empty state
	@$(MAKE) docker-compose-run service="$(api_service)" cmd="python manage.py reset_db -c --noinput"

.PHONY: create-migrations
create-migrations: ##@Backend Creates DB migrations
	@$(MAKE) docker-compose-run service="$(api_service)" cmd="python manage.py makemigrations"

.PHONY: apply-migrations
apply-migrations: ##@Backend Applies migrations to the database
	@$(MAKE) docker-compose-run service="$(api_service)" cmd="python manage.py migrate"

.PHONY: seed-database
seed-database: ##@Backend Seeds data into the database
	@$(MAKE) docker-compose-run service="$(api_service)" cmd="python manage.py seed_db"

.PHONY: manage
manage: ##@Backend Runs a Django manage command
	@$(MAKE) docker-compose-run service="$(api_service)" cmd="python manage.py $(cmd)"

.PHONY: ruff
ruff: ##@Backend Runs Ruff linter with automatic fixes
	@$(MAKE) docker-compose-run options="--no-deps" service="$(api_service)" cmd="ruff format ./ --no-cache --respect-gitignore"
	@$(MAKE) docker-compose-run options="--no-deps" service="$(api_service)" cmd="ruff check ./ --no-cache --respect-gitignore --fix"

.PHONY: mypy
mypy: ##@Backend Runs MyPy static type checker
	@$(MAKE) docker-compose-run options="--no-deps" service="$(api_service)" cmd="mypy -p app --pretty --install-types --non-interactive"

.PHONY: setup-database
setup-database: ##@Backend Resets database, runs migrations and add test data
	@$(MAKE) reset-database
	@$(MAKE) apply-migrations
	@$(MAKE) seed-database

.PHONY: setup-backend
setup-backend: ##@Backend Sets up the entire backend from scratch
	@$(MAKE) build-backend
	@$(MAKE) setup-database

.PHONY: lint-backend
lint-backend: ##@Backend Runs linters and type checking: Ruff, MyPy
	@$(MAKE) ruff
	@$(MAKE) mypy


# ======================================================================================
# Frontend
# ======================================================================================
.PHONY: build-frontend
build-frontend: ##@Frontend Builds the frontend docker image
	@$(MAKE) build service="$(frontend_service)"

.PHONY: start-frontend
start-frontend: ##@Frontend Starts the frontend
	@$(MAKE) start service="$(frontend_service)"

.PHONY: stop-frontend
stop-frontend: ##@Frontend Stops the frontend
	@$(MAKE) stop service="$(frontend_service)"

.PHONY: debug-frontend
debug-frontend: ##@Frontend Runs the Frontend in debug mode
	@$(MAKE) debug service="$(frontend_service)"

.PHONY: shell-frontend
shell-frontend: ##@Frontend Shells into the frontend container
	@$(MAKE) shell service="$(frontend_service)"

.PHONY: node
node: ##@Frontend Starts a Node shell
	@$(MAKE) docker-compose-run service="$(frontend_service)" cmd="node"

.PHONY: tsc
tsc: ##@Frontend Runs Typescript
	@$(MAKE) docker-compose-run options="--no-deps" service="$(frontend_service)" cmd="pnpm run tsc"

.PHONY: eslint
eslint: ##@Frontend Runs ESLint
	@$(MAKE) docker-compose-run options="--no-deps" service="$(frontend_service)" cmd="pnpm run eslint"

.PHONY: prettier
prettier: ##@Frontend Runs Prettier
	@$(MAKE) docker-compose-run options="--no-deps" service="$(frontend_service)" cmd="pnpm run prettier"

.PHONY: setup-frontend
setup-frontend: ##@Frontend Sets up the entire frontend from scratch
	@$(MAKE) build-frontend

.PHONY: lint-frontend
lint-frontend: ##@Frontend Runs all the linters/checks: Typescript, ESLint, and Prettier
	@$(MAKE) tsc
	@$(MAKE) eslint
	@$(MAKE) prettier


# ======================================================================================
# Misc
# ======================================================================================
.PHONY: setup
setup:  ##@Misc Sets up the entire application
	@cp -n $(backend_path).env.sample $(backend_path).env || true
	@cp -n $(frontend_path).env.sample $(frontend_path).env || true
	@$(MAKE) setup-backend
	@$(MAKE) setup-frontend

HELP_FUN = \
    %help; while(<>){push@{$$help{$$2//'options'}},[$$1,$$3] \
    if/^([\w-_]+)\s*:.*\#\#(?:@(\w+))?\s(.*)$$/}; \
    print"$$_:\n", map"  $$_->[0]".(" "x(20-length($$_->[0])))."$$_->[1]\n",\
    @{$$help{$$_}},"\n" for sort keys %help; \

.PHONY: help
help: ##@Misc Show this help
	@echo "Usage: make [target] ...\n"
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)
