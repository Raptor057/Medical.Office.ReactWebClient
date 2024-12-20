# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copiar archivos de configuración de npm
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Instalar dependencias necesarias para la compilación
RUN npm install --silent

# Copiar el resto del código fuente
COPY . .

# Ejecutar la compilación
RUN npm run build

# Mover los node_modules al directorio padre para producción
RUN npm install --production --silent && mv node_modules ../

# Configuración final
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node

# Comando para iniciar la aplicación
CMD ["npm", "start"]
