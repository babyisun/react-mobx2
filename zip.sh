#!/bin/sh

TIME=`date +%m%d-%H%M`
if which yarn 2>/dev/null; then
  yarn build:test
else
  npm run build:test
fi


if [ $? -ne 0 ]; then
exit 1
fi

rm -rf *.zip *.tar.gz
mkdir -p ./output/webroot/
mkdir -p ./output/webroot/static

cp ./build/index.html ./output/webroot/index.php
cp ./build/favicon.ico ./output/webroot/favicon.ico
cp -r ./build/static/* ./output/webroot/static

#zip -qr react-mobx2-${TIME}.zip ./output
tar zcvf react-mobx2-${TIME}.tar.gz ./output
rm -rf ./build ./output