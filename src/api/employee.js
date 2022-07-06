import request from '@/utils/request'
// 获取员工简单数据列表
export const getEmployeeInfo = () => {
  return request({
    url: '/sys/user/simple'
  })
}
