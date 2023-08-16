FROM nginx:alpine
COPY build /usr/share/nginx/html
COPY ssl/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY ssl/privkey.pem /etc/nginx/certs/privkey.pem
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]

