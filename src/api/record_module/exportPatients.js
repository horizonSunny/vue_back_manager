import http from '@/utils/http'

export function exportPatients (data) {
  return http({
    url: 'rest/backend/exportPatients',
    method: 'post',
    data: data
  })
}
