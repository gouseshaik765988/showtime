# ================================
# STAGE 1 — BUILDER
# ================================
FROM node:22-alpine AS builder

# Declare Arguments (Must be inside the stage)
ARG MONGO_USER
ARG MONGO_PASS
ARG MONGODB_URI

# Convert them to Environment Variables for the Next.js build process
ENV MONGO_USER=${MONGO_USER}
ENV MONGO_PASS=${MONGO_PASS}
ENV MONGODB_URI=${MONGODB_URI}

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
# Now this will succeed because MONGODB_URI is provided
RUN npm run build

# ================================
# STAGE 2 — RUNNER (MINIMAL)
# ================================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Re-declare env for runtime if needed by server.js
ARG MONGO_USER
ARG MONGO_PASS
ARG MONGODB_URI
ENV MONGO_USER=${MONGO_USER}
ENV MONGO_PASS=${MONGO_PASS}
ENV MONGODB_URI=${MONGODB_URI}

# Copy ONLY standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]

