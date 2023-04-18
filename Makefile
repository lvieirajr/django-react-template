backend_path=./backend/
frontend_path=./frontend/
service=api


# ======================================================================================
# Backend
# ======================================================================================
.PHONY: build-backend
build-backend:
	@docker-compose build --force-rm --no-cache $(service)

.PHONY: run-backend
run-backend:
	@docker-compose up

.PHONY: debug-backend
debug-backend:
	@docker-compose run --rm --service-ports --use-aliases --name=$(service) $(service)

.PHONY: create-migrations
create-migrations:
	@docker-compose run --rm --name=create-migrations $(service) python manage.py makemigrations

.PHONY: apply-migrations
apply-migrations:
	@docker-compose run --rm --name=apply-migrations $(service) python manage.py migrate

.PHONY: reset-database
reset-database:
	@docker-compose run --rm --name=reset-database $(service) python manage.py reset_db -c --noinput

.PHONY: shell
shell:
	@docker-compose run --rm --name=shell $(service) sh

.PHONY: python-shell
python-shell:
	@docker-compose run --rm --name=python-shell $(service) python manage.py shell_plus

.PHONY: poetry-lock
poetry-lock:
	@docker-compose run --rm --no-deps --name=upgrade-backend-dependencies $(service) poetry lock

.PHONY: ruff
ruff:
	@docker-compose run --rm --no-deps --name=ruff $(service) ruff check --fix --no-cache --show-source --show-fixes ./

.PHONY: black
black:
	@docker-compose run --rm --no-deps --name=black $(service) black ./

.PHONY: mypy
mypy:
	@docker-compose run --rm --no-deps --name=mypy $(service) mypy -p app

.PHONY: setup-backend
setup-backend:
	@$(MAKE) poetry-lock
	@$(MAKE) build-backend
	@$(MAKE) reset-database
	@$(MAKE) create-migrations
	@$(MAKE) apply-migrations

.PHONY: lint-backend
lint-backend:
	@$(MAKE) ruff
	@$(MAKE) black
	@$(MAKE) mypy


# ======================================================================================
# Frontend
# ======================================================================================
.PHONY: install-frontend
install-frontend:
	@pnpm --dir $(frontend_path) install

.PHONY: build-frontend
build-frontend:
	@pnpm --dir $(frontend_path) build

.PHONY: run-frontend
run-frontend:
	@pnpm --dir $(frontend_path) run dev

.PHONY: tsc
tsc:
	@pnpm --dir $(frontend_path) run tsc

.PHONY: eslint
eslint:
	@pnpm --dir $(frontend_path) run eslint

.PHONY: prettier
prettier:
	@pnpm --dir $(frontend_path) run prettier

.PHONY: setup-frontend
setup-frontend:
	@$(MAKE) install-frontend
	@$(MAKE) build-frontend

.PHONY: lint-frontend
lint-frontend:
	@$(MAKE) tsc
	@$(MAKE) eslint
	@$(MAKE) prettier


# ======================================================================================
# Misc
# ======================================================================================
.PHONY: setup
setup:
	@$(MAKE) setup-backend
	@$(MAKE) setup-frontend


.PHONY: help
help:
	@echo "Misc:"
	@echo " help                            Displays this help message"
	@echo " setup                           Sets up the entire application"

	@echo "\Backend:"
	@echo " build-backend                   Builds the backend"
	@echo " run-backend                     Runs the backend"
	@echo " debug-backend                   Runs the backend attached to the service to allow for debugging"
	@echo " create-migrations               Creates new migrations from model changes"
	@echo " apply-migrations                Applies migrations to the database"
	@echo " reset-database                  Resets database to an empty state"
	@echo " shell                           Starts a shell inside the container"
	@echo " python-shell                    Starts a python shell inside the container"
	@echo " poetry-lock                     Locks the python dependencies into the poetry.lock file"
	@echo " ruff                            Runs the ruff linter with automatic fixes"
	@echo " black                           Runs black linter with automatic fixes"
	@echo " mypy                            Runs static type checker"
	@echo " setup-backend                   Sets up the entire backend from scratch"
	@echo " lint-backend                    Runs all the linters/checks: Ruff, Black, and MyPy"

	@echo "\Frontend:"
	@echo " install-frontend                Installs frontend dependencies re-generating the lockfile"
	@echo " build-frontend                  Builds the frontend"
	@echo " run-frontend                    Runs the frontend"
	@echo " tsc                             Runs typescript against the codebase"
	@echo " eslint                          Runs eslint on the codebase"
	@echo " prettier                        Runs prettier on the codebase"
	@echo " setup-backend                   Sets up the entire frontend from scratch"
	@echo " lint-backend                    Runs all the linters/checks: Typescript, ESLint, and Prettier"
