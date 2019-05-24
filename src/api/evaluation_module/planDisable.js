import http from '@/utils/http'

export function planDisable (query) {
  return http({
    url: 'rest/backend/assessmentPlan/disable',
    method: 'get',
    params: query
  })
}
