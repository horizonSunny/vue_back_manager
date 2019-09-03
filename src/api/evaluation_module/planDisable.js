import http from '@/utils/http'

export function planDisable (data) {
  return http({
    url: 'rest/backend/assessmentPlan/disable',
    method: 'post',
    data: data
  })
}
