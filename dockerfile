FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
# Clean install für Produktion
RUN npm ci
COPY . .
# Baut die App in den 'build' Ordner
RUN npm run build
# Unnötige Dev-Dependencies entfernen
RUN npm prune --production

FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
# WICHTIG: Migrations-Ordner kopieren, damit Drizzle sie findet
COPY drizzle drizzle/

# Port exponieren
EXPOSE 3000

# Startbefehl
CMD ["node", "build/index.js"]