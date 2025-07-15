FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Copy output
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_STRAPI_API_URL=https://admin.uplifttech.dev
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=G-QZPW51MJ4X

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npx", "next", "start"]
