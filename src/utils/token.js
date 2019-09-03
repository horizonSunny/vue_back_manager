import Cookies from 'js-cookie'
const Token = 'accesstoken'

export function getToken () {
  return Cookies.get(Token)
}

export function setToken (accesstoken) {
  return Cookies.set(Token, accesstoken)
}

export function removeToken () {
  return Cookies.remove(Token)
}
