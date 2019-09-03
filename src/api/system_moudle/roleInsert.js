import http from '@/utils/http'

export function roleInsert (data) {
  return http({
    url: 'rest/backend/role/insert',
    method: 'post',
    data: data
  })
}
