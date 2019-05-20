import http from '@/utils/http'

export function token (data) {
  return http({
    url: 'rest/backend/patients',
    method: 'post',
    data: data
  })
}
