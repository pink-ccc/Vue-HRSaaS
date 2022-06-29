// 导入axios
import axios from 'axios'

// 创建了一个新的axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时时间
})

// 导出实例
export default request
