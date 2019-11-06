#!/bin/sh
cd backend/ || exit
echo Starting deploy...
npm run deploy
cd ..
