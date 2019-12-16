#!/bin/sh
echo Starting install dependencies for backend...
cd backend/ || exit
npm ci
cd ..
