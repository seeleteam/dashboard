/* global window */
import modelExtend from 'dva-model-extend'
import { queryMetrics } from '../services/metrics'
import {  METRICS_NAMESPACE } from '../const'

export default modelExtend({
  namespace: METRICS_NAMESPACE,

  state: {
    MetricsData: [],
  },

  subscriptions: {
  },

  effects: {
    * getMetricsData ({payload}, { put, call }) {
      let metricsdata = yield call(queryMetrics, payload)
      console.log(333, metricsdata)
      yield put({ type: 'Metrics', payload: metricsdata.data })
    },  
  },

  reducers: {
    Metrics (state, { payload }) {
      return {
        ...state,
        MetricsData: payload,
      }
    }, 
  },
})
