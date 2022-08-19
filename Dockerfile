FROM node:16-alpine

WORKDIR /app
COPY ./build build
COPY package.json .

EXPOSE 5173
CMD ["node", "./build"]