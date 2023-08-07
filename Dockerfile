FROM node:latest

WORKDIR /usr/src/knights/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
