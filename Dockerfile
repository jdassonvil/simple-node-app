FROM ubuntu:focal

CMD [ "node", "app.js"] 

RUN apt-get update && apt-get install curl

RUN curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt-get install -y nodejs

RUN mkdir -p /opt/apps/simple-node-app
WORKDIR /opt/apps/simple-node-app

COPY package.json .
RUN npm install

COPY app.js .
