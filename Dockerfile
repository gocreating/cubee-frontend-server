FROM node:8.16.0-alpine

COPY package*.json ./

RUN apk update && \
    yarn && \
    rm -rf /var/cache/apk/*

COPY . /srv/cubee-frontend-server

WORKDIR /srv/cubee-frontend-server

EXPOSE 3000

ENTRYPOINT ["sh", "/srv/cubee-frontend-server/docker-entrypoint.sh"]
