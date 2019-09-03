import http from '@/utils/http'

// 查询医院
export function hospitalFind (query) {
  return http({
    url: 'rest/backend/hospital/find',
    method: 'get',
    params: query
  })
}
