cd /var/www/ui
export PATH=$PATH:/usr/bin
npm install
npm run build
rm -rf build
mv dist build
