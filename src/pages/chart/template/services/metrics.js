import { request, config } from 'utils'

const { api } = config
const { querySqls } = api

export function queryMetrics (data) {
  return request({
    url: querySqls,
    method: 'get',
    data,
  })
}
