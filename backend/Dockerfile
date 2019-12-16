FROM node:10

# Create app directory
WORKDIR /usr/src/app

ARG DBHOST_ARG=1
ARG DBPASSWORD_ARG=1
ARG DBUSER_ARG=1

ENV DBHOST_ENV=$DBHOST_ARG
ENV DBPASSWORD_ENV=$DBPASSWORD_ARG
ENV DBUSER_ENV=$DBUSER_ARG

# Install app dependencies
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

EXPOSE 5000

RUN echo $DBUSER_ENV
RUN echo $DBUSER_ARG

CMD [ "node", "index.js" ]
