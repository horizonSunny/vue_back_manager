import http from '@/utils/http'

export function forgetPassword (data) {
  return http({
    url: 'forget/backend/forgetPassword',
    method: 'post',
    data: data
  })
}
