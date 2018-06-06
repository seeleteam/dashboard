import { request, config } from 'utils'

const { api } = config
const { querySqls } = api

export function queryMemAllocs (data) {
  return request({
    url: querySqls,
    method: 'get',
    data,
  })
}

export function queryMemFrees (params) {
  return request({
    url: querySqls,
    method: 'get',
    data: params,
  })
}
