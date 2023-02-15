FROM node:18.12.0-alpine3.16

WORKDIR /usr/app
COPY ../package.json .
COPY ../yarn.lock .
RUN yarn

RUN apk add curl

ENTRYPOINT ["/bin/sh", "-c", "yarn start:debug"]
