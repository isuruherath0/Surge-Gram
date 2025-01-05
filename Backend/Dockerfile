# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the backend code
COPY . .

# Expose the port the backend server listens on
EXPOSE 3000

# Run the backend using environment variables from the .env file
CMD ["npm", "start"]
