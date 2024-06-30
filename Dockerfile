FROM mongo-express:1.0.2-20-alpine3.19

WORKDIR /usr/src/app

COPY package.json yarn.lock ./


RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/app.js"]
