import http from '@/utils/http'

export function patientsList (data) {
  return http({
    url: 'rest/backend/patients',
    method: 'post',
    data: data
  })
}
