import { request, config } from 'utils'

const { api } = config
const { queryDatabaseURL, queryNodesURL, queryMetricsURL } = api

export function queryDatabase (params) {
  return request({
    url: queryDatabaseURL,
    method: 'get',
    data: params,
  })
}

export function queryNodes (params) {
  return request({
    url: queryNodesURL,
    method: 'get',
    data: params,
  })
}

export function queryMetrics (params) {
  return request({
    url: queryMetricsURL,
    method: 'get',
    data: params,
  })
}
