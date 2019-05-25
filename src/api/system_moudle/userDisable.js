import http from '@/utils/http'

export function userDisable (data) {
  return http({
    url: 'rest/backend/user/disable',
    method: 'post',
    data: data
  })
}
