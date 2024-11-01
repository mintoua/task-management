# Utiliser une image Node.js pour construire l'application
FROM node:18-alpine

# Créer le dossier de travail
WORKDIR /app

# Copier les fichiers et installer les dépendances
COPY . .
RUN npm install
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
