import http from '@/utils/http'

export function roleList (query) {
  return http({
    url: 'rest/backend/role/query',
    method: 'get',
    params: query
  })
}
