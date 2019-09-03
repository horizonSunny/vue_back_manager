import http from '@/utils/http'

export function cityQuery () {
  return http({
    url: 'rest/backend/city/query',
    method: 'get'
  })
}
