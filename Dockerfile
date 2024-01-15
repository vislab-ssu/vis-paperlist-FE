FROM node:20.9.0 AS build-stage

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN yarn install

COPY . /app
ENV API_SRC=paperlist-be-container
ENV API_PORT=3001

RUN yarn run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf