# ================================
# STAGE 1 — BUILDER
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ================================
# STAGE 2 — RUNNER (MINIMAL)
# ================================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy ONLY standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]

