import http from '@/utils/http'
export function queryHospitals () {
  return http({
    url: 'rest/backend/city/query',
    method: 'get'
  })
}
<<<<<<< HEAD
export function queryWXHospitals () {
  return http({
    url: 'wx/provinceCity?status=0',
    method: 'get'
  })
}
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
