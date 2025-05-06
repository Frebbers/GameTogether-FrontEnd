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
FROM node:18-alpine AS production
WORKDIR /app

# Install the `serve` package globally
RUN npm install -g serve

# Copy the built output from the build stage
COPY --from=build /app/dist /app/dist

# Expose port 5173 for the frontend application
EXPOSE 5173

# Use `serve` to serve the app, and bind to port 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
