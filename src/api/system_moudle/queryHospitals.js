import http from '@/utils/http'
export function queryHospitals () {
  return http({
    url: 'rest/backend/city/query',
    method: 'get'
  })
}
export function queryWXHospitals () {
  return http({
    url: 'wx/provinceCity?status=0',
    method: 'get'
  })
}
