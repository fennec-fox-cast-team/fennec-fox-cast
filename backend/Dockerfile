FROM node:10

# Create app directory
WORKDIR /usr/src/app

ENV DBHOST
ENV DBPASSWORD
ENV DBUSER

# Install app dependencies
COPY package*.json ./

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]
