import http from '@/utils/http'

export function synchronousData (data) {
  return http({
    url: 'rest/backend/synchronousData',
    method: 'post',
    data: data
  })
}
