FROM node:18.16.0-slim
RUN mkdir -p /app
WORKDIR /app
RUN chmod 777 -R /app
ENV TZ=America/Lima
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && apt-get install -y openssh-server git

#RUN export IONIC_CMDOPTS_CORDOVA_RUN_LIVERELOAD=1 \
# export IONIC_CMDOPTS_CORDOVA_RUN_CONSOLELOGS=1 \
# export IONIC_CMDOPTS_CORDOVA_RUN_LIVERELOAD_PORT=1234 \
# export IONIC_CMDOPTS_CORDOVA_RUN_HOST=0.0.0.0 \
#
#RUN yarn global add @ionic/cli
#RUN yarn global add @ionic/angular@latest
RUN npm install -g @ionic/cli
RUN npm i -D -E @angular/cli

USER root
USER node
EXPOSE 80