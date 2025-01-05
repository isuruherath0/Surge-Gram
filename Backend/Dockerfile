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

# Pass build args (environment variables) to the app
ARG MONGO_URI
ARG JWT_SECRET
ARG PORT

# Set environment variables for the backend
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT

# Expose the port the backend server listens on
EXPOSE $PORT

# Run the backend using environment variables
CMD ["npm", "start"]
