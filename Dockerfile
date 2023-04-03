#Sample Dockerfile for NodeJS Apps

FROM node:16

ENV NODE_ENV=DEV

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]