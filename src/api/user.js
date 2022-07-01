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

// 导出获取用户资料接口
export const reqGetUserInfo = () => {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

// 导出获取用户头像接口
export const reqGetUserDetailById = (id) => {
  return request({
    method: 'get',
    url: `/sys/user/${id}`
  })
}
