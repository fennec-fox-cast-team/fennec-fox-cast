FROM node:10

# Create app directory
WORKDIR /usr/src/app

ARG DBHOST_ARG=1
ARG DBPASSWORD_ARG=1
ARG DBUSER_ARG=1

ENV DBHOST=$DBHOST_ARG
ENV DBPASSWORD=$DBPASSWORD_ARG
ENV DBUSER=$DBUSER_ARG

# Install app dependencies
COPY package*.json ./

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ]
