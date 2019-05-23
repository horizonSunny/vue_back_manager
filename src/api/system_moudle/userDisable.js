import http from '@/utils/http'

export function userDisable (query) {
  return http({
    url: 'rest/backend/user/disable',
    method: 'get',
    params: query
  })
}
