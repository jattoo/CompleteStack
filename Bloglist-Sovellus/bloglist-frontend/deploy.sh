#!/bin/sh
npm run build
rm -rf ../bloglist-backend/build
cp -r build ../bloglist-backend/

chmod u+x deploy.sh