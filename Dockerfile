FROM node:22-alpine

WORKDIR /app

COPY . .

EXPOSE 4466

RUN npm install

CMD ["npm", "start"]