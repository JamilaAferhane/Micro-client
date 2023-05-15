# Étape de construction
FROM node:16.20-bullseye-slim as builder

ENV NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Définit le répertoire de travail
WORKDIR /app

# Copie le fichier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm ci --only=production && \
    npm cache clean --force

# Copie le reste du code source
COPY . .

# Construit l'application pour la production
RUN npm run build


# Étape de production
FROM nginx:1.21.0-alpine as production

# Copie les fichiers de build de l'étape de construction vers le serveur Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copie la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port sur lequel écoute Nginx
EXPOSE 80

# Démarre le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
