import http from '@/utils/http'

export function evaluationList (query) {
  return http({
    url: 'rest/backend/assessmentItem/query',
    method: 'get',
    params: query
  })
}
