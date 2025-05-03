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

# Production Stage (no Nginx)
FROM node:18-alpine AS production

WORKDIR /app

# Copy build output to container
COPY --from=build /app/dist /app/dist

EXPOSE 5173
CMD ["npm", "run", "serve"]
