import http from '@/utils/http'

// 查询组织结构
export function orgQuery (query) {
  return http({
    url: 'rest/backend/org/query',
    method: 'get',
    params: query
  })
}
