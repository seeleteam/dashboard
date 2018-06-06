/* global window */
import modelExtend from 'dva-model-extend'

export default modelExtend({
  namespace: 'highCharts',

  state: {
    selectType: '10s',
  },

  subscriptions: {
  },

  effects: {

    * getSelectType ({ payload }, { put }) {
      yield put({ type: 'setSelectType', payload: payload })
    },

  },

  reducers: {
    setSelectType (state, { payload }) {
      return {
        ...state,
        selectType: payload,
      }
    },
  },
})
