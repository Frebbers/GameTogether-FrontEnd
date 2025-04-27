# Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# Add environment args
ARG ENVIRONMENT=Development

# Set env for the build process
ENV ENVIRONMENT=$ENVIRONMENT

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production

# Add environment arg here too
ARG ENVIRONMENT=Development
ENV ENVIRONMENT=$ENVIRONMENT

COPY --from=build /app/dist /usr/share/nginx/html

# Conditionally copy nginx config based on environment
COPY nginx.${ENVIRONMENT}.conf /etc/nginx/nginx.conf

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]