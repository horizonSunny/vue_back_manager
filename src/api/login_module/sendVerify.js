import http from '@/utils/http'
export function sendVerify (query) {
  return http({
    url: 'forget/backend/sendVerify',
    method: 'get',
    params: query
  })
}
