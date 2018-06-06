/* global window */
import modelExtend from 'dva-model-extend'
import { queryMemAllocs } from '../services/memory'

export default modelExtend({
  namespace: 'MemAllocs',

  state: {
    MemAllocsData: [],
  },

  subscriptions: {
  },

  effects: {

    * getMemAllocs ({payload}, { put, call }) {
      let MemAllocsdata = yield call(queryMemAllocs, payload)
      yield put({ type: 'MemAllocs', payload: MemAllocsdata.data })
    },

  },

  reducers: {
    MemAllocs (state, { payload }) {
      return {
        ...state,
        MemAllocsData: payload,
      }
    },
  },
})
