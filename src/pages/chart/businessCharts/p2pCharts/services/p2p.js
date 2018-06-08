import { request, config } from 'utils'

const { api } = config
const { querySqls } = api

export function queryPeerCount (data) {
  return request({
    url: querySqls,
    method: 'get',
    data,
  })
}

export function queryAddPeer (params) {
  return request({
    url: querySqls,
    method: 'get',
    data: params,
  })
}

export function queryDeletePeer (params) {
  return request({
    url: querySqls,
    method: 'get',
    data: params,
  })
}
