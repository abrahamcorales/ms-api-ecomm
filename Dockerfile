FROM node:14-alpine3.14
WORKDIR /usr/src/app

LABEL author="Abraham Corales"
#COPY package*.json server.js ./
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD [ "npm" ,"run", "start" ]