# Usar una imagen ligera de Node para la construcción de la app
FROM node:16-alpine AS build

# Crear el directorio de trabajo de la app
WORKDIR /app

# Copiar los archivos de dependencias y luego instalar las dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar todo el contenido del proyecto y construir la app (aunque solo usamos el HTML)
COPY . .

# Usar una imagen ligera de Apache para servir la app
FROM httpd:alpine

# Copiar el archivo html desde la fase de construcción al directorio de Apache
COPY --from=build /app/hola.html /usr/local/apache2/htdocs/index.html

# Exponer el puerto 80
EXPOSE 80
