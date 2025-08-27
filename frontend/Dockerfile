# frontend/Dockerfile
# Use Node 20 to meet engine requirements
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies first (cacheable step)
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Disable browser auto-launch to avoid PowerShell crash
ENV BROWSER=none

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
