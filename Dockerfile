# Step 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy files and install deps
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:stable-alpine AS production

# Copy built files from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Add custom nginx config for React Router support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]