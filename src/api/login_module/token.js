import http from '@/utils/http'

export function token (user) {
  return http({
    url: 'rest/user/login',
    method: 'post',
    data: user
  })
}
