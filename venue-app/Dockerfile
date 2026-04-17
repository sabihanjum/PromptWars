# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy the built optimal static files to nginx serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx configuration to route correctly (optional for SPA, but good practice)
# We will just expose port 80 and let default nginx handle the static files
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
