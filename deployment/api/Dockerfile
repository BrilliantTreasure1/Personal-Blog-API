FROM node:20-alpine AS builder

WORKDIR /app


COPY package*.json ./


RUN npm ci --only=production


COPY . .


FROM node:20-alpine


RUN addgroup -g 1001 nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app


COPY --from=builder --chown=nodejs:nodejs /app /app

EXPOSE 3000


USER nodejs


CMD ["node", "app.js"]