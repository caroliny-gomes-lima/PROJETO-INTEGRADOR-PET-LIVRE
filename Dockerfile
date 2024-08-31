FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env /usr/src/app/.env
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]