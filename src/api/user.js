// 导入axios实例
import request from '@/utils/request'

// 导出登录接口函数
export const reqLogin = (data) => {
  return request({
    method: 'post',
    url: '/sys/login',
    data

  })
}
