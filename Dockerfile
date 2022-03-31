FROM node:16-alpine

WORKDIR /app
COPY ./build build
COPY package.json .

EXPOSE 3000
CMD ["node", "./build"]