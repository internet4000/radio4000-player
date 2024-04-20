# Use node image as base
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy application logic to the container
COPY package*.json ./
COPY index.html ./

# shadowed as volumes by compose
COPY src ./src/

# Install dependencies
RUN npm install

# Expose the port on which the frontend server runs
EXPOSE 4000

# Command to start the development server
CMD ["npm", "run", "start"]
