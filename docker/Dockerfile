FROM node:18.16.0-slim

ENV TZ=America/Lima
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && apt-get install -y openssh-server git
RUN apt install -y default-jre
RUN mkdir -p /app
COPY config.xml ./app
COPY ionic.config.json ./app
WORKDIR /app
RUN chmod 777 -R /app
RUN mkdir -p /app/app
RUN npm install -g npm@9.7.1
RUN npm install -g cordova
RUN npm i -g ionic
#RUN npm install -g @ionic/cli
RUN npm i -D -E @angular/cli
RUN npm i cordova-plugin-facebook-connect

RUN ionic info
#RUN ionic cordova plugin add cordova-plugin-facebook-connect --variable APP_ID="1303994670541423" --variable APP_NAME="happyparking"
RUN ls -l
USER root
USER node
EXPOSE 80