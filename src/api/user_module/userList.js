import http from '@/utils/http'

export function userList (data) {
  return http({
    url: 'rest/backend/queryDoctors',
    method: 'post',
    data: data
  })
}
