FROM node:18-alpine

WORKDIR /app

# 1. Copie séparée des fichiers de dépendances (optimisation du cache)
COPY package.json package-lock.json ./

# 2. Installation des dépendances avec nettoyage du cache
RUN npm install --production && \
    npm cache clean --force

# 3. Copie du reste du code
COPY . .

# 4. Port exposé (optionnel pour Vite/React)
EXPOSE 5173

# 5. Commande de démarrage
CMD ["npm", "start"] 