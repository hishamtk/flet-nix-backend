FROM node:19.3.0-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . . 

EXPOSE 9000

ENTRYPOINT [ "npm" ,"run","start" ]

