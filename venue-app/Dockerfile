# Unified Full-Stack Node Environment
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy dependency graphs and configure production
COPY package*.json ./
RUN npm install --omit=dev

# In Vite, depending on if it's placed in devDependencies, we need to run full install first
RUN npm install

# Copy application payload
COPY . .

# Generate the highly optimized Vite distribution bundle
RUN npm run build

# Expose strict production port
EXPOSE 8080
ENV PORT=8080

# Execute server boot
CMD ["node", "server.js"]
