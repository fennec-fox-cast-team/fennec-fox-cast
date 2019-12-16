#!/bin/sh
cd backend/ || exit
echo Starting tests for backend...
npm run lint
npm run test
cd ..
