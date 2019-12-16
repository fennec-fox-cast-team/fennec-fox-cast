FROM node:10

# Create app directory
WORKDIR /usr/src/app

ENV DBUSER=1
ENV DBHOST=1
ENV DBPASSWORD=1

# Install app dependencies
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

EXPOSE 5000

RUN echo $DBUSER

CMD [ "node", "index.js" ]
