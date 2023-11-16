FROM nginx:stable-alpine

COPY apps/users/nginx.conf /etc/nginx/nginx.conf

COPY dist/apps/users /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
