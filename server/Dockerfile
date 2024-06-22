FROM node:lts-alpine AS build-stage
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install 
COPY ./ . 
EXPOSE $PORT
# EXPOSE 3000
CMD [ "npm", "start" ]