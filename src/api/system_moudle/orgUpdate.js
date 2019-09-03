import http from '@/utils/http'

export function orgUpdate (data) {
  return http({
    url: 'rest/backend/org/update',
    method: 'post',
    data: data
  })
}
