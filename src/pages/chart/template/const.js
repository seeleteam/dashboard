
// var METRICS_NAME = 'runtime.memory.alloc.gauge'
// var METRICS_NAMESPACE = METRICS_NAME.replace(/./g, '_')
// var METRICS_PARAM_NAMESPACE = METRICS_NAME.replace(/./g, '_') + '_metricsChart'
var METRICS_NAMESPACE = 'metrics_space'
var METRICS_PARAM_NAMESPACE ='metricsChart_space'
var METRICS_PATH = METRICS_NAMESPACE + '/getMetricsData'

export {
  METRICS_NAMESPACE,
  METRICS_PARAM_NAMESPACE,
  // METRICS_NAME,
  METRICS_PATH,
}