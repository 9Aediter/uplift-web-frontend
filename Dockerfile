# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_NOTION_TOKEN
ARG NEXT_PUBLIC_NOTION_DATABASE_ID

ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_STRAPI_API_URL=$NEXT_PUBLIC_STRAPI_API_URL
ENV NEXT_PUBLIC_NOTION_TOKEN=$NEXT_PUBLIC_NOTION_TOKEN
ENV NEXT_PUBLIC_NOTION_DATABASE_ID=$NEXT_PUBLIC_NOTION_DATABASE_ID
RUN npm run build

# Run stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
