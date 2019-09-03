import http from '@/utils/http'

export function insertDoctor (data) {
  return http({
    url: 'rest/backend/insertDoctor',
    method: 'post',
    data: data
  })
}
