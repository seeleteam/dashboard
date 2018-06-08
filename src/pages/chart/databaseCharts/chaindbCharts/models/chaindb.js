/* global window */
import modelExtend from 'dva-model-extend'
import { queryCompactInput, queryCompactOutput, queryCompactTime, queryWritedelayCounter, queryWritedelayDuration } from '../services/chaindb'

export default modelExtend({
  namespace: 'chaindb',

  state: {
    CompactInputData: [],
    CompactOutputData: [],
    CompactTimeData: [],
    WritedelayCounterData: [],
    WritedelayDurationData: [],
  },

  subscriptions: {
  },

  effects: {
    * getCompactInput ({payload}, { put, call }) {
      let CompactInputData = yield call(queryCompactInput, payload)
      yield put({ type: 'CompactInput', payload: CompactInputData.data })
    },

    * getCompactOutput ({payload}, { put, call }) {
      let CompactOutputData = yield call(queryCompactOutput, payload)
      yield put({ type: 'CompactOutput', payload: CompactOutputData.data })
    },

    * getCompactTime ({payload}, { put, call }) {
      let CompactTimeData = yield call(queryCompactTime, payload)
      yield put({ type: 'CompactTime', payload: CompactTimeData.data })
    }, 

    * getWritedelayCounter ({payload}, { put, call }) {
      let WritedelayCounterData = yield call(queryWritedelayCounter, payload)
      yield put({ type: 'WritedelayCounter', payload: WritedelayCounterData.data })
    }, 
    
    * getWritedelayDuration ({payload}, { put, call }) {
      let WritedelayDurationData = yield call(queryWritedelayDuration, payload)
      yield put({ type: 'WritedelayDuration', payload: WritedelayDurationData.data })
    },   
  },

  reducers: {
    CompactInput (state, { payload }) {
      return {
        ...state,
        CompactInputData: payload,
      }
    },
    CompactOutput (state, { payload }) {
      return {
        ...state,
        CompactOutputData: payload,
      }
    },
    CompactTime (state, { payload }) {
      return {
        ...state,
        CompactTimeData: payload,
      }
    },
    WritedelayCounter (state, { payload }) {
      return {
        ...state,
        WritedelayCounterData: payload,
      }
    },
    WritedelayDuration (state, { payload }) {
      return {
        ...state,
        WritedelayDurationData: payload,
      }
    },       
  },
})
