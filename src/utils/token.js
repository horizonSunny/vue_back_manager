const Token = 'accesstoken'

export function getToken () {
  return localStorage.getItem(Token)
}

export function setToken (accesstoken) {
  return localStorage.setItem(Token, accesstoken)
}

export function removeToken () {
  return localStorage.removeItem(Token)
}
