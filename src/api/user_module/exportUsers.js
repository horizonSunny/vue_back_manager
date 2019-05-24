import http from '@/utils/http'

export function exportUsers (data) {
  return http({
    url: 'rest/backend/exportDoctors',
    method: 'post',
    data: data
  })
}
