import request from '@/utils/request'
// 获取所有角色列表数据
export function reqGetRoleList(page = 1, pagesize = 10) {
  return request({
    method: 'get',
    url: '/sys/role',
    params: {
      page,
      pagesize
    }
  })
}
// 删除公司角色接口
export const delRole = (id) => {
  return request({
    method: 'delete',
    url: `/sys/role/${id}`
  })
}

// 添加角色

export const addRole = (data) => {
  return request({
    method: 'post',
    url: '/sys/role',
    data
  })
}

// 根据id获取
export const getRole = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}

// 根据id修改公司角色信息
export const editRole = (data) => {
  return request({
    method: 'put',
    url: `/sys/role/${data.id}`,
    data
  })
}
