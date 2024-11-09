FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

# Instalar polyfill para flujos en Node.js
RUN npm install web-streams-polyfill

COPY . .

EXPOSE 80

CMD ["npm", "start"]
