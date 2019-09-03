import http from '@/utils/http'

// 查询组织结构
<<<<<<< HEAD
export function orgQuery (query) {
  return http({
    url: 'rest/backend/org/query',
    method: 'get',
    params: query
=======
export function orgQuery () {
  return http({
    url: 'rest/backend/org/query',
    method: 'get'
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  })
}
