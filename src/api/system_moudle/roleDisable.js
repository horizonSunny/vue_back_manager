import http from '@/utils/http'

export function roleDisable (query) {
  return http({
    url: 'rest/backend/role/disable',
    method: 'get',
    params: query
  })
}
