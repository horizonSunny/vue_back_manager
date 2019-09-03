import http from '@/utils/http'

export function userUpdate (data) {
  return http({
    url: 'rest/backend/user/update',
    method: 'post',
    data: data
  })
}
