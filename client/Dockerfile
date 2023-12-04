FROM node AS build-stage
# RUN cd /etc/yum.repos.d/
# RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
# RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
# RUN yum clean all
# RUN yum install -y \
#     npm \
#     nodejs16
# RUN npm install -g @vue/cli
WORKDIR /app
COPY . /app/  
# COPY package.json ./
# RUN npm config set registry "https://registry.npm.taobao.org/"
RUN npm install
# RUN unset CI

# RUN cd /app
RUN npm run build

# nginx
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/index/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

