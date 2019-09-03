import http from '@/utils/http'

export function assessmentPlanUpdate (data) {
  return http({
    url: 'rest/backend/assessmentPlan/update',
    method: 'post',
    data: data
  })
}
