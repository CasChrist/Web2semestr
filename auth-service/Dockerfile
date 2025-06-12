FROM node:18-alpine

WORKDIR /app

COPY ./ ./

RUN yarn install

RUN yarn build

EXPOSE 3003

CMD ["node", "dist/app.js"]
