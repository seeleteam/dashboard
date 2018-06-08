# Seele DashBoard

This is a visual dashboard for viewing seele metrics.It gets metrics data from dashboard-api and display them through vue framework.

## Prerequisite
* node
* npm

## Installation
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

## Config Item Description
### src/utils/config.js
``` bash
const API_URL = 'http://localhost:61001' // dashboard-api server url
```
## View
see seele dashboard at http://localhost:8000(default)

## Commands
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