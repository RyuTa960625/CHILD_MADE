FROM node:20.9.0

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
# ENTRYPOINT ["serve", "-l","3000","-s", "dist"]
ENTRYPOINT ["npm", "start"]