/* global window */
import modelExtend from 'dva-model-extend'
import { queryMemAllocs, queryMemPauses } from '../services/memory'

export default modelExtend({
  namespace: 'memory',

  state: {
    MemAllocsData: [],
    MemPausesData: [],
  },

  subscriptions: {
  },

  effects: {
    * getMemAllocs ({payload}, { put, call }) {
      let MemAllocsdata = yield call(queryMemAllocs, payload)
      yield put({ type: 'MemAllocs', payload: MemAllocsdata.data })
    },

    * getMemPauses ({payload}, { put, call }) {
      let MemPausesdata = yield call(queryMemPauses, payload)
      yield put({ type: 'MemPauses', payload: MemPausesdata.data })
    },    
  },

  reducers: {
    MemAllocs (state, { payload }) {
      return {
        ...state,
        MemAllocsData: payload,
      }
    },
    MemPauses (state, { payload }) {
      return {
        ...state,
        MemPausesData: payload,
      }
    },    
  },
})
