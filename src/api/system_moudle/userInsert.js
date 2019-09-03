import http from '@/utils/http'

export function userInsert (data) {
  return http({
    url: 'rest/backend/user/insert',
    method: 'post',
    data: data
  })
}
