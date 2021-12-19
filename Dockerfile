FROM node:16.8.0

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY src ./src

CMD ["npm", "run", "dev"]