# nginx/Dockerfile
FROM nginx:latest

ARG ENVIRONMENT

COPY ./nginx.${ENVIRONMENT}.conf /etc/nginx/nginx.conf
