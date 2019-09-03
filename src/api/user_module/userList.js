import http from '@/utils/http'

export function userList (data) {
  return http({
<<<<<<< HEAD
    url: 'rest/backend/queryDocs',
=======
    url: 'rest/backend/queryDoctors',
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    method: 'post',
    data: data
  })
}
