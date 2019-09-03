import Cookies from 'js-cookie'

export function getCookie (name) {
  return Cookies.get(name)
}

export function setCookie (name, value) {
  return Cookies.set(name, value)
}

export function removeCookie (name) {
  return Cookies.remove(name)
}
