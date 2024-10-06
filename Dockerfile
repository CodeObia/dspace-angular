# This image will be published as dspace/dspace-angular
# See https://github.com/DSpace/dspace-angular/tree/main/docker for usage details

FROM node:18-alpine

# Ensure Python and other build tools are available
# These are needed to install some node modules, lo
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /app
ADD . /app/

# We run yarn install with an increased network timeout (5min) to avoid "ESOCKETTIMEDOUT" errors from hub.docker.com
# See, for example https://github.com/yarnpkg/yarn/issues/5540
RUN yarn install --network-timeout 300000

RUN yarn merge-i18n -s /app/src/themes/cgiar/assets/i18n

RUN yarn build:prod

FROM docker.io/nginx:stable
COPY --from=0 /app/dist /app/dist
RUN mkdir -p /app/config

COPY config/config.prod.yml /app/config/config.prod.yml
COPY config/nginx-default.conf /etc/nginx/conf.d/default.conf

ARG DEBIAN_FRONTEND=noninteractive
ENV NODE_VERSION 18.17.1
ENV NVM_DIR /usr/local/nvm
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN mkdir $NVM_DIR && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

RUN echo "source $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default" | bash
