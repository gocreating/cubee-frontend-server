FROM node:8.16.0-alpine

ARG PROJECT_REPONAME
ARG SHA1
ARG BUILD_DATE
ARG IMAGE_TAG

COPY package*.json ./

RUN apk update && \
    yarn && \
    rm -rf /var/cache/apk/*

COPY . /srv/cubee-frontend-server

WORKDIR /srv/cubee-frontend-server

RUN yarn global add razzle pm2 && \
    yarn build

ENV repoName=${PROJECT_REPONAME} \
    commitSHA1=${SHA1} \
    buildDate=${BUILD_DATE} \
    imageTag=${IMAGE_TAG}

EXPOSE 3000

ENTRYPOINT ["sh", "/srv/cubee-frontend-server/docker-entrypoint.sh"]
