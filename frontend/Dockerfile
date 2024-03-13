# Base Image
FROM node:20-alpine AS base

# Arguments
ARG ENVIRONMENT=production

# Environment
WORKDIR /app/
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV="$ENVIRONMENT"

# OS dependencies & configuration
RUN apk add --no-cache bash g++ make python3 \
    && corepack enable \
    && npm update -g npm pnpm


# Node Modules Image
FROM base AS node-modules

# Application configuration files
COPY ./package.json ./pnpm-lock.yaml /app/

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store/ \
    if [ "$ENVIRONMENT" = "development" ] || [ "$ENVIRONMENT" = "test" ] || [ "$ENVIRONMENT" = "ci" ] ; \
    then pnpm install --frozen-lockfile ; \
    else pnpm install --frozen-lockfile --prod ; fi


# Dist Image
FROM base AS dist

# Application code
COPY ./ /app/

# Node Modules
COPY --from=node-modules /app/node_modules/ /app/node_modules/

# Build application
RUN --mount=type=cache,id=pnpm,target=/pnpm/store/ \
    pnpm install --frozen-lockfile \
    && pnpm run build


# Application Image
FROM base as app

# Dependencies and Application
COPY ./package.json ./pnpm-lock.yaml /app/
COPY --from=node-modules /app/node_modules/ /app/node_modules/
COPY --from=dist /app/dist/ /app/dist/
