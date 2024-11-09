FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./ 

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Instalar polyfills para flujos en Node.js
RUN npm install web-streams-polyfill

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto 80 para Apache (o el que estés utilizando)
EXPOSE 80

# Comando para ejecutar tu aplicación o iniciar Apache
CMD ["npm", "start"]
