/* global window */
import modelExtend from 'dva-model-extend'
import { METRICS_PARAM_NAMESPACE } from '../const'

export default modelExtend({
  namespace: METRICS_PARAM_NAMESPACE,

  state: {
    statTimeRange: '15m',
  },

  subscriptions: {
  },

  effects: {
    * getStatTimeRange ({ payload }, { put }) {
      yield put({ type: 'setStatTimeRange', payload: payload })
    },    
  },

  reducers: {
    setStatTimeRange (state, { payload }) {
      return {
        ...state,
        statTimeRange: payload,
      }
    },    
  },
})
