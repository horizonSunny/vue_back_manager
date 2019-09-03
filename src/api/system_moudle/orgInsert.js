import http from '@/utils/http'

export function orgInsert (data) {
  return http({
    url: 'rest/backend/org/insert',
    method: 'post',
    data: data
  })
}
