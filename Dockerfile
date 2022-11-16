FROM node:16.18.1-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS deploy-node
WORKDIR /app
COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules
EXPOSE 5173
CMD ["node", "index.js"]
