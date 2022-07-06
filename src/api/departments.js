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
// 封装新增部门
export const getDepartment = (data) => {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}
// 封装根据ID修改部门详情
export const reqEditDepartment = (data) => {
  return request({
    method: 'put',
    url: `/company/department/${data.id}`,
    data
  })
}

// 获取信息模块
export const reqGetDepartDetail = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}

