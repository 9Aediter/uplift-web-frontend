# ✅ Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# ✅ คัดลอกไฟล์ที่จำเป็น
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ✅ Stage 2: Run (Optimized Standalone Output)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV STRAPI_BASE_URL=https://strapi.uplift.dev

# ✅ Copy เฉพาะไฟล์ output ที่ Next 15 สร้างแบบ standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
