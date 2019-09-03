import http from '@/utils/http'

export function roleList (query) {
  return http({
    url: 'rest/backend/role/query',
    method: 'get',
    params: query
  })
}
<<<<<<< HEAD

export function allRoleList (query) {
  return http({
    url: 'rest/backend/role/find',
    method: 'get'
  })
}

export function allPermission (query) {
  return http({
    url: 'rest/backend/permission',
    method: 'get'
  })
}
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
