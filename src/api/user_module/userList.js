import http from '@/utils/http'

export function userList (data) {
  return http({
    url: 'rest/backend/queryDocs',
    method: 'post',
    data: data
  })
}
