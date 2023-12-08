FROM node AS build-stage

# ADD ./src /app
WORKDIR /app
COPY ./ /app/  

RUN npm install

EXPOSE 80

# RUN npm run dev


# RUN npm run build

# # nginx
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/index/html
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"] 

