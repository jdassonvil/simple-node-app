FROM ubuntu:focal

CMD [ "node", "app.js"] 

RUN mkdir -p /opt/apps/simple-node-app
RUN apt-get update && apt-get install -y nodejs

WORKDIR /opt/apps/simple-node-app
COPY app.js /opt/apps/simple-node-app
