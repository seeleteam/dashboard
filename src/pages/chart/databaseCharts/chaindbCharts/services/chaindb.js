import { request, config } from 'utils'

const { api } = config
const { querySqls } = api

export function queryCompactInput (data) {
  return request({
    url: querySqls,
    method: 'get',
    data,
  })
}

export function queryCompactOutput (params) {
  return request({
    url: querySqls,
    method: 'get',
    data: params,
  })
}

export function queryCompactTime (params) {
  return request({
    url: querySqls,
    method: 'get',
    data: params,
  })
}

export function queryWritedelayCounter (params) {
  return request({
    url: querySqls,
    method: 'get',
    data: params,
  })
}

export function queryWritedelayDuration (params) {
  return request({
    url: querySqls,
    method: 'get',
    data: params,
  })
}
