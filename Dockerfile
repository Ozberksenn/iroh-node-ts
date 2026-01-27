# 1️⃣ Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2️⃣ Runtime stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

# SADECE derlenmiş JS'leri al
COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/server.js"]




# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 3001

# CMD ["npm", "run", "start"]
