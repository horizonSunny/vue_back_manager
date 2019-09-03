import http from '@/utils/http'

export function roleUpdate (data) {
  return http({
    url: 'rest/backend/role/update',
    method: 'post',
    data: data
  })
}
