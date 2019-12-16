FROM node:10

# Create app directory
WORKDIR /usr/src/app

ARG DBUSER_ARG=1
ARG DBHOST_ARG=1
ARG DBPASSWORD_ARG=1

ENV DBUSER=$DBUSER_ARG
ENV DBHOST=$DBHOST_ARG
ENV DBPASSWORD=$DBPASSWORD_ARG

# Install app dependencies
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

EXPOSE 5000

RUN echo $DBUSER

CMD [ "node", "index.js" ]
