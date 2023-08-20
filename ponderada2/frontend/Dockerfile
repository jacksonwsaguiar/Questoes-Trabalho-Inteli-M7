# Use the official NGINX image as the base image
FROM nginx:latest

# Remove the default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy your HTML folders
COPY login /usr/share/nginx/html/login
COPY home /usr/share/nginx/html/home

# Expose the default port for NGINX
EXPOSE 80
