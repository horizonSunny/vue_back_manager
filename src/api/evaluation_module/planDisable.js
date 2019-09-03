import http from '@/utils/http'

<<<<<<< HEAD
export function planDisable (data) {
  return http({
    url: 'rest/backend/assessmentPlan/disable',
    method: 'post',
    data: data
=======
export function planDisable (query) {
  return http({
    url: 'rest/backend/assessmentPlan/disable',
    method: 'get',
    params: query
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  })
}
