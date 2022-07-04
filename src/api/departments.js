// 导入
import request from '@/utils/request'
// 封装获取企业部门列表函数
export const reqGetDepartments = () => {
  return request({
    url: '/company/department'
  })
}

// 封装根据id删除企业部门列表函数
export const reqDelDepartments = (id) => {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}
