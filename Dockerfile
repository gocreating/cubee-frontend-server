FROM node:8.16.0-alpine

ARG PROJECT_REPONAME
ARG SHA1
ARG BUILD_DATE
ARG IMAGE_TAG

COPY package*.json ./
# COPY yarn.lock ./

RUN apk update && \
    yarn && \
    rm -rf /var/cache/apk/*

COPY . /srv/cubee-frontend-server

WORKDIR /srv/cubee-frontend-server

# We manually install `babel-loader` here to make razzle.config.js correctly load typescript through `babel-loader`
# since it somehow doesn't work if we specify `babel-loader` in either package.json or yarn.lock
RUN npm install -g razzle pm2 && \
    # yarn add -D babel-loader && \
    npm run build

ENV repoName=${PROJECT_REPONAME} \
    commitSHA1=${SHA1} \
    buildDate=${BUILD_DATE} \
    imageTag=${IMAGE_TAG}

EXPOSE 3000

ENTRYPOINT ["sh", "/srv/cubee-frontend-server/docker-entrypoint.sh"]
