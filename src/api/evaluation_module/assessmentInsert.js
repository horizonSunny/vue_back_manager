import http from '@/utils/http'

export function assessmentInsert (data) {
  return http({
    url: 'rest/backend/assessmentItem/insert',
    method: 'post',
    data: data
  })
}
