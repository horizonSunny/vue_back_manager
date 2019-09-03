import axios from 'axios'
import { getToken } from './token'
import baseUrl from './global'
<<<<<<< HEAD
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import { getCookie } from '@/utils/userInfo'

let vm = new Vue()
const http = axios.create({
  baseURL: process.env.baseURL || baseUrl,
  timeout: 15000
=======

const http = axios.create({
  baseURL: process.env.baseURL || baseUrl,
  timeout: 5000
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
})

http.interceptors.request.use(
  config => {
<<<<<<< HEAD
    if (getToken()) {
      config.headers['Token'] = getToken()
    }
    if (
      getCookie('loginUser') &&
      store.getters.user &&
      store.getters.user.userName !== getCookie('loginUser')
    ) {
      vm.$message.error('您已经被强制下线')
      router.push({ path: '/' })
    }
    if (config.config) {
      config.timeout = config.config.timeout
    }
=======
    console.log('http_gettoken_', getToken())
    if (getToken()) {
      config.headers['Token'] = getToken()
    }
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    return config
  },
  error => {
    Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
<<<<<<< HEAD
    console.log('response_', response)
    if (response.data.status && Number(response.data.status) === 0) {
      console.log('response.data.status !== 1_')
      vm.$message.error(response.data.message)
      return Promise.reject(response.data.message)
    } else if (response.data.status && Number(response.data.status) === 2) {
      // return Promise.resolve(response)
      vm.$message.error('该账号被他人登陆')
      router.push({ path: '/' })
    } else {
      return Promise.resolve(response)
    }
=======
    return response
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  },
  error => {
    Promise.reject(error)
  }
)

export default http
