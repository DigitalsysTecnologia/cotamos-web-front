# Node Builder
FROM node:carbon as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run generate

# Docker Runner
FROM nginx:alpine
COPY --from=builder /app/dist /var/www
CMD 'nginx'