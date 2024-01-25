FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# nginx
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/index/html
COPY nginx/production.conf /etc/nginx/conf.d/default.conf
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"] 
