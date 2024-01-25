FROM node AS build-stage
WORKDIR /usr/src/app
COPY ./server/package*.json ./
RUN npm install 
COPY ./server . 
EXPOSE $PORT
CMD [ "npm", "start" ]