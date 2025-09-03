# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npx prisma generate
RUN npm run build

# Run stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate

COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

EXPOSE 3000
CMD ["npm", "start"]
