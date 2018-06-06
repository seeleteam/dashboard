const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '5',
    bpid: '1',
    name: 'Charts',
    icon: 'code-o',
  },
  // {
  //   id: '51',
  //   bpid: '5',
  //   mpid: '5',
  //   name: 'ECharts',
  //   icon: 'line-chart',
  //   route: '/chart/ECharts',
  // },
  {
    id: '52',
    bpid: '5',
    mpid: '5',
    name: 'highCharts',
    icon: 'bar-chart',
    route: '/chart/highCharts',
  },
  // {
  //   id: '53',
  //   bpid: '5',
  //   mpid: '5',
  //   name: 'Rechartst',
  //   icon: 'area-chart',
  //   route: '/chart/Recharts',
  // },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
