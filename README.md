# Seele DashBoard

This is a visual dashboard for viewing seele metrics.It gets metrics data from dashboard-api and display them through vue framework.

## Prerequisite
### development mode
* node
* npm
### production mode
* node
* npm
* nginx

## Installation
### dev mode
make sure you have node.js and npm installed
``` bash
# clone dashboard repository
git clone https://github.com/seeleteam/dashboard
cd dashboard
# install the dependencies
npm install
# start dashboard front
npm run start
```

### production mode
make sure you have node.js,npm,nginx installed
``` bash
# clone dashboard repository
git clone https://github.com/seeleteam/dashboard
cd dashboard
# install the dependencies
npm install
# build production output
npm run build
# deploy dashboard vue front
cp -r dist /usr/local/nginx/dashboard
# config nginx server
...
# reload nginx
nginx -s reload
```

## Config Item Description
### src/utils/config.js
``` bash
const API_URL = 'http://localhost:61001' // dashboard-api server url
```
### package.json
``` bash
  "scripts": {
  "analyze": "cross-env PORT=8000 ANALYZE=1 BABELRC=1 umi build", // dashboard-port: PORT=8000
  "start": "cross-env PORT=8000 BABELRC=1 COMPILE_ON_DEMAND=none BROWSER=none HOST=0.0.0.0 umi dev", // dashboard-port: PORT=8000
  "lint": "eslint --fix --ext .js src",
  "build": "cross-env PORT=8000 BABELRC=1 umi build", // dashboard-port: PORT=8000
  "test": "umi test"
}
```
## View
see seele dashboard at http://localhost:8000(default)

## Commands
### npm commands
``` bash
# install dependencies
npm install
# start server
npm run start  
# code check
npm run lint
# build for production
npm run build
```