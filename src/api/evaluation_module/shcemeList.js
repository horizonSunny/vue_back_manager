import http from '@/utils/http'

export function shcemeList (query) {
  return http({
    url: 'rest/backend/assessmentPlan/query',
    method: 'get',
    params: query
  })
}
