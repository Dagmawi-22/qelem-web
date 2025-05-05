# Stage 1: Build the application
FROM node:18-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine as runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000
CMD ["node", "build"]