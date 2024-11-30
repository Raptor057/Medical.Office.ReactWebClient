# # Usa una imagen base de Node.js
# FROM node:20

# # Establece el directorio de trabajo en /app
# WORKDIR /app

# # Copia el package.json y el package-lock.json
# COPY package*.json ./
# # COPY ["./package.json", "./"]
# # COPY ["./package-lock.json", "./"]

# # Instala las dependencias
# RUN npm install

# # Copia el resto de la aplicación
# COPY . .

# # Construye la aplicación
# RUN npm run build

# # Expone el puerto en el que la aplicación correrá
# EXPOSE 3000

# # Comando para correr la aplicación
# CMD ["npm", "start"]



# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de tu aplicación
COPY . .

# Ejecuta el build de Next.js
RUN npm run build

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para arrancar la aplicación en producción
CMD ["npm", "start"]
