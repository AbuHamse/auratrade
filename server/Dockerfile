# syntax=docker/dockerfile:1.5

FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install

COPY . .
RUN npm run build

# Production runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install --production

COPY --from=build /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/server.js"]