/* global window */
import modelExtend from 'dva-model-extend'
import { queryPeerCount, queryAddPeer, queryDeletePeer } from '../services/p2p'

export default modelExtend({
  namespace: 'p2p',

  state: {
    PeerCountData: [],
    AddPeerData: [],
    DeletePeerData: [],
  },

  subscriptions: {
  },

  effects: {
    * getPeerCount ({payload}, { put, call }) {
      let PeerCountData = yield call(queryPeerCount, payload)
      yield put({ type: 'PeerCount', payload: PeerCountData.data })
    },

    * getAddPeer ({payload}, { put, call }) {
      let AddPeerData = yield call(queryAddPeer, payload)
      console.log(123, AddPeerData)
      yield put({ type: 'AddPeer', payload: AddPeerData.data })
    },

    * getDeletePeer ({payload}, { put, call }) {
      let DeletePeerData = yield call(queryDeletePeer, payload)
      yield put({ type: 'DeletePeer', payload: DeletePeerData.data })
    }, 
  },

  reducers: {
    PeerCount (state, { payload }) {
      return {
        ...state,
        PeerCountData: payload,
      }
    },
    AddPeer (state, { payload }) {
      return {
        ...state,
        AddPeerData: payload,
      }
    },
    DeletePeer (state, { payload }) {
      return {
        ...state,
        DeletePeerData: payload,
      }
    },    
  },
})
