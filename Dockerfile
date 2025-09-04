# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base
WORKDIR /app
# Install OpenSSL for Prisma engines
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# --- deps: install all deps and generate Prisma client ---
FROM base AS deps
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate

# --- build: compile SvelteKit ---
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- prod: only what we need at runtime ---
FROM node:20-bookworm-slim AS prod
WORKDIR /app
ENV NODE_ENV=production
# Install OpenSSL for Prisma at runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
# copy generated Prisma client + runtime deps (no dev deps)
COPY --from=deps /app/node_modules ./node_modules
RUN npm prune --omit=dev
COPY --from=build /app/build ./build
COPY prisma ./prisma
COPY package.json ./
EXPOSE 8080
CMD ["npm","start"]
