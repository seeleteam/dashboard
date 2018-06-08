/* global window */
import modelExtend from 'dva-model-extend'
import { queryDatabase, queryNodes, queryMetrics } from '../services/dashboard'
import _ from 'lodash'

export default modelExtend({
  namespace: 'dashboard',

  state: {
    NodeCount: 0,
    MetricsCount: 0,
    DatabaseData: [],
    NodesData: [],
    MetricsData: [],
  },

  subscriptions: {
  },

  effects: {   
    * getDataBases ({payload}, { put, call }) {
      let databases = yield call(queryDatabase, payload)
      yield put({ type: 'DataBases', payload: databases.data })
    }, 

    * getNodes ({payload}, { put, call }) {
      let nodes = yield call(queryNodes, payload)
      yield put({ type: 'Nodes', payload: nodes.data })
      let nodescount = 0
      if (_.isUndefined(nodes) || _.isUndefined(nodes.data) || nodes.data.length === 0) {
        nodescount = 0
      } else {
        nodescount = nodes.data.length
      }
      yield put({ type: 'NodeCount', payload: nodescount })
    }, 

    * getMetrics ({payload}, { put, call }) {
      let metrics = yield call(queryMetrics, payload)
      yield put({ type: 'Metrics', payload: metrics.data })
      let metricscount = 0
      if (_.isUndefined(metrics) || _.isUndefined(metrics.data) || metrics.data.length === 0) {
        metricscount = 0
      } else if (_.isUndefined(metrics.data[0].Series) || metrics.data[0].Series.length === 0) {
        metricscount = 0
      } else if (_.isUndefined(metrics.data[0].Series[0].values)) {
        metricscount = 0
      } else {
        metricscount = metrics.data[0].Series[0].values.length
      }
      yield put({ type: 'MetricsCount', payload: metricscount })
    },       
  },

  reducers: {
    NodeCount (state, { payload }) {
      return {
        ...state,
        NodeCount: payload,
      }
    },
    MetricsCount (state, { payload }) {
      return {
        ...state,
        MetricsCount: payload,
      }
    },        
    DataBases (state, { payload }) {
      return {
        ...state,
        DatabaseData: payload,
      }
    }, 
    Nodes (state, { payload }) {
      return {
        ...state,
        NodesData: payload,
      }
    }, 
    Metrics (state, { payload }) {
      return {
        ...state,
        MetricsData: payload,
      }
    },         
  },
})
