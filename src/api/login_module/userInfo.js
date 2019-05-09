import http from '@/utils/http'

export function userInfo () {
  return http({
    url: 'rest/user/login',
    method: 'get'
  })
}
