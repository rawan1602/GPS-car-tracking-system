FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN chmod +x node_modules/.bin/vite

EXPOSE 8080

CMD ["npm", "run", "dev"]
