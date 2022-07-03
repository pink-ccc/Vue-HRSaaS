import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-78-nb'

// 取token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 存token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
