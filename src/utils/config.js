const API_URL = 'http://localhost:61001'

// mock api
const APIV1 = '/api/v1'
// query api
const API_QUERY_URL = API_URL + '/api/query'
// show api
const API_SHOW_URL = API_URL + '/api/show'

module.exports = {
  name: 'dashboard',
  prefix: 'dashboard',
  footerText: 'seele-dashboard  © 2018 seele',
  logos: '/public/logo_s.png',
  logo: '/public/logo.png',
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',
  CORS: [API_URL],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    querySqls: `${API_QUERY_URL}/sqls`,
    queryParams: `${API_QUERY_URL}/params`,
    queryDatabaseURL: `${API_SHOW_URL}/databases`,
    queryNodesURL: `${API_QUERY_URL}/nodeInfo`,
    queryMetricsURL: `${API_SHOW_URL}/measurements`,        
  },
}
