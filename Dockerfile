FROM node:16-alpine

WORKDIR /app
COPY ./build build
COPY package.json .
COPY package-lock.json .
RUN npm ci --prod

EXPOSE 5173
CMD ["node", "./build"]
