# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

# Copy TLS certs (from context)
COPY certs/localhost.pem /etc/ssl/certs/localhost.pem
COPY certs/localhost-key.pem /etc/ssl/private/localhost-key.pem

# Custom nginx config to enable SSL
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
