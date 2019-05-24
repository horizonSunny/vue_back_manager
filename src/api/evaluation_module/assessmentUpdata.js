import http from '@/utils/http'

export function assessmentUpdata (data) {
  return http({
    url: 'rest/backend/assessmentItem/update',
    method: 'post',
    data: data
  })
}
