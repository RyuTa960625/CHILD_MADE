FROM node:20.9.0

WORKDIR /app
COPY . .
RUN npm install

RUN npm run build
RUN npm install -g serve
EXPOSE 3000
# CMD ["serve", "-l","3000","-s", "dist"]
ENTRYPOINT ["npm", "start"]