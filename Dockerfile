# Node Builder
FROM node:carbon as builder

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run generate

# Docker Runner
FROM kyma/docker-nginx
COPY --from=builder /app/dist /var/www
CMD 'nginx'