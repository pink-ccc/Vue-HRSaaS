// 导入axios
import axios from 'axios'
// 引入Vue
import Vue from 'vue'
// 引入store
import store from '@/store'

// 创建了一个新的axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时时间
})

// 添加请求拦截器
request.interceptors.request.use(function(config) {
  config.headers.Authorization = 'Bearer ' + store.getters.token
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function(response) {
  // 处理 axios 默认的一层包裹
  const res = response.data
  // 如果返回的 success为false 则表示请求失败 提示用户
  if (!res.success) {
    // 提示用户错误信息
    Vue.prototype.$message.error(res.message)
    // 抛出错误对象
    return Promise.reject(new Error(res.message))
  }

  return res
}, function(error) {
  // 提示错误消息
  Vue.prototype.$message.error(error.message)
  return Promise.reject(error)
})
// 导出实例
export default request
