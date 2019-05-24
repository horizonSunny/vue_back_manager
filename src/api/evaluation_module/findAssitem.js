import http from '@/utils/http'

export function findAssitem () {
  return http({
    url: 'rest/backend/assessmentItem/find',
    method: 'get'
  })
}
