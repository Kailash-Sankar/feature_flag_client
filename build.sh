#!/bin/bash

set -e

npm install
npm run lint-check
# npm run test
npm run build

# find build -name *.map |xargs rm
# rm build/*.json
# rm build/*.js

# REACT_APP_API_HOST=`grep REACT_APP_API_HOST ./.env | awk -F '=' '{print $2}'`
# REACT_APP_PULSE_DOMAIN=`grep REACT_APP_PULSE_DOMAIN ./.env | awk -F '=' '{print $2}'`
# REACT_APP_PUBLIC_URL=`grep REACT_APP_PUBLIC_URL ./.env | awk -F '=' '{print $2}'`

# sed -i "s%$REACT_APP_API_HOST%\$REACT_APP_API_HOST%g" build/static/js/*.js
# sed -i "s%$REACT_APP_PULSE_DOMAIN%\$REACT_APP_PULSE_DOMAIN%g" build/static/js/*.js
# sed -i "s%$REACT_APP_PUBLIC_URL%\$REACT_APP_PUBLIC_URL%g" build/static/js/*.js

echo "pacakge static"
tar czvf dist/frontend-static.tar.gz  dist/static

#echo "add pacakge version $VERSION"
#sed -i "s%contentInsightVersion=''%contentInsightVersion='$VERSION'%g" build/index.html

echo "package index"
tar czvf dist/frontend-public.tar.gz dist/index.html

#sed -i "s%\$REACT_APP_API_HOST%$REACT_APP_API_HOST%g" build/static/js/*.js
#sed -i "s%\$REACT_APP_PULSE_DOMAIN%$REACT_APP_PULSE_DOMAIN%g" build/static/js/*.js
#sed -i "s%\$REACT_APP_PUBLIC_URL%$REACT_APP_PUBLIC_URL%g" build/static/js/*.js

