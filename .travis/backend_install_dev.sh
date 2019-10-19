#!/bin/sh
cd backend/ || exit
npm ci
npm run lint
npm run test
cd ..