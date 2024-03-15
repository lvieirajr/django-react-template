# Base Image
FROM node:20-alpine

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

# Application code
COPY ./ /app/

# Installing dependencies and building application
RUN --mount=type=cache,id=pnpm,target=/pnpm/store/ \
    if [ "$ENVIRONMENT" = "development" ] || [ "$ENVIRONMENT" = "test" ] || [ "$ENVIRONMENT" = "ci" ] ; \
    then pnpm install --frozen-lockfile ; \
    else pnpm install --frozen-lockfile --prod ; fi \
    && pnpm run build
