FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./ 

# Instala las dependencias con --legacy-peer-deps para compatibilidad
RUN npm install --legacy-peer-deps

# Instalar polyfills para flujos en Node.js
RUN npm install readable-stream stream-browserify

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto 80 para Apache (o el que estés utilizando)
EXPOSE 80

# Comando para ejecutar tu aplicación o iniciar el servidor de pruebas
CMD ["npm", "test"]  # Ejecuta los tests en lugar de iniciar un servidor web