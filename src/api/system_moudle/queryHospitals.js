import http from '@/utils/http'
export function queryHospitals () {
  return http({
    url: 'rest/backend/city/query',
    method: 'get'
  })
}
