// import http from '@/utils/http'
// export function userInfo () {
//   return http({
//     url: 'rest/user/login',
//     method: 'get'
//   })
// }

// mock
import { userMessage } from '../mock'
export function userInfo () {
  return new Promise((resolve, reject) => {
    resolve(userMessage)
  })
}
