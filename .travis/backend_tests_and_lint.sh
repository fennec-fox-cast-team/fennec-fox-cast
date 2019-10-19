#!/bin/sh
cd backend/ || exit
npm run lint
npm run test
cd ..