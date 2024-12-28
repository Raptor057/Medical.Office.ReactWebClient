# Versión: 1.0
# # FROM node:lts-alpine
# # ENV NODE_ENV=production
# # WORKDIR /usr/src/app
# # COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# # RUN npm install --production --silent && mv node_modules ../
# # COPY . .
# # EXPOSE 3000
# # RUN chown -R node /usr/src/app
# # USER node
# # CMD ["npm", "start"]

# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app

# # Copiar archivos de configuración de npm
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# # Instalar dependencias necesarias para la compilación
# RUN npm install --silent

# # Copiar el resto del código fuente
# COPY . .

# # Ejecutar la compilación
# RUN npm run build

# # Mover los node_modules al directorio padre para producción
# RUN npm install --production --silent && mv node_modules ../

# # Configuración final
# EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node

# # Comando para iniciar la aplicación
# CMD ["npm", "start"]


# versión 2.0
# # Etapa 1: Construcción de la aplicación
# FROM node:lts-alpine AS build
# ENV NODE_ENV=production
# WORKDIR /usr/src/app

# # Copiar los archivos necesarios para instalar dependencias
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# # Instalar dependencias
# RUN npm install --silent

# # Copiar el código fuente
# COPY . .

# # Ejecutar la construcción estática
# RUN npm run build

# # Etapa 2: Servir los archivos estáticos con Nginx
# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html

# # Copiar los archivos generados al directorio de Nginx
# COPY --from=build /usr/src/app/out .

# # Remover configuración por defecto de Nginx
# RUN rm /etc/nginx/conf.d/default.conf

# # Agregar configuración personalizada de Nginx
# COPY nginx.conf /etc/nginx/conf.d

# # Exponer el puerto 80
# EXPOSE 80

# # Comando para iniciar Nginx
# CMD ["nginx", "-g", "daemon off;"]


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
COPY nginx.conf /etc/nginx/conf.d

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
