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

# Default Port
ENV PORT=5173
# Default ENV variables for communication with clouditor engine
ENV OAUTH_URL=http://localhost:8080/v1/auth/authorize
ENV OAUTH_TOKEN_URL=http://localhost:8080/v1/auth/token
ENV OAUTH_CLIENT_ID=dashboard
ENV OAUTH_REDIRECT_URI=http://localhost:5173/callback
ENV OAUTH_SCOPE="profile email"
ENV OAUTH_CLOUDITOR_URL=http://localhost:8080
CMD ["node", "index.js"]
