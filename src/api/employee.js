import request from '@/utils/request'
// 获取员工简单数据列表
export const getEmployeeInfo = () => {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工列表
export const reqGetEmployeeList = (page = 1, size = 10) => {
  return request({
    url: '/sys/user',
    params: {
      page,
      size
    }
  })
}
/**
 * 删除员工 ()
 */
export function reqDelEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}
// 新增员工
export const reqGetEmployee = (data) => {
  return request({
    method: 'post',
    url: '/sys/user',
    data

  })
}

// 批量导入员工
export function reqImportEmployee(arr) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data: arr
  })
}
