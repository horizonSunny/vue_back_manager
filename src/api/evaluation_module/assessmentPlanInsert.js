import http from '@/utils/http'

export function assessmentPlanInsert (data) {
  return http({
    url: 'rest/backend/assessmentPlan/insert',
    method: 'post',
    data: data
  })
}
