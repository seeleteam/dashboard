/* global window */
import modelExtend from 'dva-model-extend'

export default modelExtend({
  namespace: 'physicalCharts',

  state: {
    statTimeRange: '1m',
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
