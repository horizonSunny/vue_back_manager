import http from '@/utils/http'

export function roleDisable (data) {
  return http({
    url: 'rest/backend/role/disable',
    method: 'post',
    data: data
  })
}
