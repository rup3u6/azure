# Use the Nginx image
FROM nginx:1.25
 
COPY dist/wistronfamily_cms_fe /usr/share/nginx/html/wis_fe
 
# Remove the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
 
# Replace with our own nginx.conf
COPY wis_fe.conf /etc/nginx/conf.d/