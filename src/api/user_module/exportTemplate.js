import http from '@/utils/http'

export function exportTemplate () {
  return http({
    url: 'rest/backend/getFileURL',
    method: 'get'
  })
}
