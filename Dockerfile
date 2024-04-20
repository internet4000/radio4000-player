# Use node image as base
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy application logic to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of config files
COPY poi.config.js ./

# Copy index.html and demo/index.html files
COPY index.html ./index.html
COPY demo/index.html ./demo/index.html

# shadowed as volumes by compose
COPY src ./src/

# Expose the port on which the frontend server runs
EXPOSE 4002

# Command to start the development server
CMD ["npm", "run", "start"]
