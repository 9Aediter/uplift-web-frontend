# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY . .
RUN npm ci && npm run build

# Run stage
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json .
RUN npm install --production

EXPOSE 3000
CMD ["npx", "start"]
