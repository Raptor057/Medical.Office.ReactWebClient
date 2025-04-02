# Versión 3.0
# Etapa 1: Construcción de la aplicación
FROM node:lts-alpine AS build
WORKDIR /usr/src/app

# Copiar los archivos necesarios para instalar dependencias
COPY ["package.json", "package-lock.json*", "./"]

# Instalar dependencias
RUN npm install --silent

# Copiar el código fuente
COPY . .

# Pasar la variable de entorno para React
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Construir la aplicación estática
RUN npm run build

# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar los archivos generados al directorio de Nginx
COPY --from=build /usr/src/app/out .

# Remover configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Agregar configuración personalizada de Nginx
#COPY nginx.conf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
