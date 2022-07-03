import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 添加请求拦截器
request.interceptors.request.use(function(config) {
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const res = response.data
  const { message, success } = res
  if (!success) {
    Vue.prototype.$message.error(message) // 提示错误消息
    return Promise.reject(new Error(message)) // 业务已经错误了, 应该进catch
  }
  return res
}, function(error) {
  // 对响应错误做点什么, 服务器错误, 400, 404, 500
  console.dir(error) // 便于调试
  if (error.response.status === 401 && error.response.data.code === 10002) {
    // 提示用户
    Vue.prototype.$message.error('登录信息超时，请重新登录')
    // 清空token 和userInfo
    store.dispatch('user/logout')
    // 跳转至登录页
    router.push('/login')
  } else {
    Vue.prototype.$message.error(error.message) // 提示错误消息
  }
  return Promise.reject(error)
})

export default request
