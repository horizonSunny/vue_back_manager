import http from '@/utils/http'

export function updateDoctorStatus (data) {
  return http({
    url: 'rest/backend/updateDoctorStatus',
    method: 'post',
    data: data
  })
}
