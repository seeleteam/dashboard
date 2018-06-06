const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
// query api
const API_QUERY = 'http://wxcsdb88.com:61001/api/query'
// show api
const API_SHOW = 'http://wxcsdb88.com:3000/api/show'

module.exports = {
  name: 'dashboard',
  prefix: 'dashboard',
  footerText: 'seele-dashboard  © 2018 seele',
  logos: '/public/logo_s.png',
  logo: '/public/logo.png',
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',
  CORS: ['http://wxcsdb88.com:61001', 'http://wxcsdb88.com:3000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    querySqls: `${API_QUERY}/sqls`,
    queryParams: `${API_SHOW}/params`,
  },
}
