# Use Node.js for building the app
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the frontend code
COPY . .

# Build the production-ready React app
RUN npm run build

# Use Nginx as the base image
FROM nginx:stable-alpine

# Copy the built files to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]