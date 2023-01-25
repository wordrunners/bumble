ARG NODE_VERSION=19
ARG SERVER_PORT=5000

FROM node:$NODE_VERSION-bullseye as base

WORKDIR /app

FROM base as builder

COPY package.json yarn.lock
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lerna bootstrap \
  && rm -rf /app/packages/server/dist/ \
  && yarn build

FROM node:$NODE_VERSION-bullseye-slim as production
WORKDIR /app

COPY --from=builder /app/packages/client/ /client/
COPY --from=builder /app/packages/server/dist/ /app/
COPY --from=builder /app/packages/server/package.json /app/package.json

RUN sed -i 's/"client": "0.0.0"/"client": "file:..\/client"/g' /app/package.json \
    && yarn install --production=true

EXPOSE $SERVER_PORT
CMD [ "node", "/app/index.js" ]
