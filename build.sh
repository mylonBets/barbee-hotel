#!/bin/sh
# Assemble the publishable site into dist/.
# preview/ (reference renders) and incoming/ (photo inbox) are working files
# and deliberately never ship.
set -e
cd "$(dirname "$0")"
rm -rf dist
mkdir -p dist
cp -R assets dist/assets
mkdir -p dist/hotel dist/dannys
cp hotel/index.html  dist/hotel/index.html
cp dannys/index.html dist/dannys/index.html
for f in index.html 404.html styles.css site.js favicon.ico robots.txt sitemap.xml llms.txt site.webmanifest; do
  cp "$f" dist/"$f"
done
echo "dist/ built: $(find dist -type f | wc -l | tr -d ' ') files, $(du -sh dist | cut -f1)"
