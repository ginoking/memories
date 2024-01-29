FROM node AS build-stage
ARG MONGO_URI_ARG=mongodb://db:27017
ENV MONGO_URI=${MONGO_URI_ARG}
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install 
COPY ./ . 
EXPOSE $PORT
EXPOSE 3000
CMD [ "npm", "start" ]