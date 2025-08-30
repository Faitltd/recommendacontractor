# syntax=docker/dockerfile:1
# 1) Build stage with devDependencies
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
RUN npm install
# Copy application source
COPY . .
# Generate Prisma client before building (needed during SSR/prerender)
RUN npx prisma generate
# Build the SvelteKit app
RUN npm run build
# 2) Runtime stage: copy built app and pruned node_modules
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache libc6-compat
# Copy package manifests and full node_modules from builder, then prune dev deps
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
RUN npm prune --omit=dev
# Copy built app from builder stage
COPY --from=builder /app/build ./build
# Copy Prisma schema/migrations (needed for migrate deploy in entrypoint)
COPY --from=builder /app/prisma ./prisma
# Copy entrypoint script
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# Expose port and run via entrypoint that applies migrations first
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
