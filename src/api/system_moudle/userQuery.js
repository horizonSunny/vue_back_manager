import http from '@/utils/http'

export function userQuery (query) {
  return http({
    url: 'rest/backend/user/query',
    method: 'get',
    params: query
  })
}
