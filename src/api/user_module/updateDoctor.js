import http from '@/utils/http'

export function updateDoctor (data) {
  return http({
    url: 'rest/backend/updateDoctor',
    method: 'post',
    data: data
  })
}
