import http from '@/utils/http'

export function roleList () {
  return http({
    url: 'rest/backend/role/find',
    method: 'get'
  })
}
