import request from '@/utils/request'

// 登录请求
export const reqLogin = (data) => {
  return request({
    method: 'post',
    // 改造url
    // 第一步：删除请求的服务器地址 自动的拼接浏览器中的服务器名：http://localhost:8888/
    // http://localhost:8888/dev-api/api/sys/login 没有做任何操作得到的路径
    // 第二步：http://localhost:8888/api/sys/login  这是改造后需要的地址
    url: '/sys/login', // 由于开发环境所有接口都要加 /api 所以通过baseUrl加\
    data // 请求体参数
  })
}

// 获取用户基本信息请求
export const reqGetUserInfo = () => {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

// 获取用户头像信息请求
export function reqGetUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
