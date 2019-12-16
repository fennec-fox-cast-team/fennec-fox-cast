#!/bin/sh
cd backend/ || exit
echo Starting deploy...
wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
heroku plugins:install heroku-container-registry
docker login -u _ --password=$HEROKU_API_KEY registry.heroku.com
heroku container:push web --app $HEROKU_APP_NAME --arg DBUSER=$DBUSER --arg DBHOST=$DBHOST --arg DBPASSWORD=$DBPASSWORD
heroku container:release web --app $HEROKU_APP_NAME
heroku ps:scale web=1 --app $HEROKU_APP_NAME
cd ..
