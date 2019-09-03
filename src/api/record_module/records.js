import http from '@/utils/http'

// 查询报告详情
export function records (query) {
  return http({
    url: 'rest/backend/patient/records',
    method: 'get',
    params: query
  })
}
