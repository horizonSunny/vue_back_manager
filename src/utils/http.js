import axios from 'axios'
import { getToken } from './token'
import baseUrl from './global'

const http = axios.create({
  baseURL: process.env.baseURL || baseUrl,
  timeout: 1000
})

http.interceptors.request.use(
  config => {
    if (getToken) {
      config.headers['Authorization'] = getToken
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    Promise.reject(error)
  }
)

export default http
