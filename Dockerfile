FROM node:18-alpine

WORKDIR /app

COPY ./api-gateway ./

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/app.js"]
