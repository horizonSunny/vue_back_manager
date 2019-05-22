import http from '@/utils/http'

// 查询组织结构
export function orgQuery () {
  return http({
    url: 'rest/backend/org/query',
    method: 'get'
  })
}
