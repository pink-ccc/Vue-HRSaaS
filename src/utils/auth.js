// 使用Cookies 将数据保存在Cookies中
import Cookies from 'js-cookie'

const TokenKey = 'hrSaaS-token'

// 取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 存token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
