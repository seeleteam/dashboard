const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',   
  },
  {
    id: '5',
    bpid: '1',
    name: 'template',
    icon: 'code-o',
    route: '/chart/template',
  },  
  // {
  //   id: '2',
  //   bpid: '1',
  //   name: 'MetricsCharts',
  //   icon: 'code-o',
  // },

  // {
  //   id: '21',
  //   bpid: '2',
  //   mpid: '2',
  //   name: 'physicalCharts',
  //   icon: 'line-chart',
  //   route: '/chart/physicalCharts',
  // },
  // {
  //   id: '22',
  //   bpid: '2',
  //   mpid: '2',
  //   name: 'databaseCharts',
  //   icon: 'line-chart',
  //   route: '/chart/databaseCharts',
  // }, 
  // {
  //   id: '221',
  //   bpid: '22',
  //   mpid: '22',
  //   name: 'chaindbCharts',
  //   icon: 'line-chart',
  //   route: '/chart/databaseCharts/chaindbCharts',
  // },   
  // {
  //   id: '23',
  //   bpid: '2',
  //   mpid: '2',
  //   name: 'businessCharts',
  //   icon: 'line-chart',
  //   route: '/chart/businessCharts',
  // },  
  // {
  //   id: '231',
  //   bpid: '23',
  //   mpid: '23',
  //   name: 'p2pCharts',
  //   icon: 'line-chart',
  //   route: '/chart/businessCharts/p2pCharts',
  // },    
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
