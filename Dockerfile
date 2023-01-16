# build stage
# Download NodeJS
FROM node:13.12.0-alpine as build
# Set current directory to /app
WORKDIR /app
# Copy current project dir to /app
COPY .. .
# Download all dependencies && Produce build folder
RUN npm install && npm run build

# Production stage
# Download nginx
FROM nginx:stable-alpine
# Copy build folder to nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html
# Copy nginx.conf file over as defaul.conf
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Serve on port 80
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]