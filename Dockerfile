FROM node:20.9.0

WORKDIR /app
COPY package.json .
RUN yarn install

COPY . .

ENV VITE_APP_API_SRC=http://203.253.21.192:3333

EXPOSE 5173

CMD ["yarn", "run", "dev"]
