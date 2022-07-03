// 导入封装的 登录模块
import { reqLogin, reqGetUserInfo, reqGetUserDetailById } from '@/api/user'
// 导入 Cookies 模块
import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
  // 一进来优先从缓存中取
  token: getToken() || null,
  userInfo: {}
}

const mutations = {
  // 定义修改token函数
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  // 定义修改uesrInfo函数
  setUserInfo(state, UserInfo) {
    state.userInfo = UserInfo
  // 退出后删除 token
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 退出后删除 用户信息 userInfo
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 定义 登录函数 在组件中调用 将组件中的手机号，密码传参过来
  async login(context, data) {
  // 发送ajax
    const res = await reqLogin(data)
    // 将token 保存至cookies中
    context.commit('setToken', res.data)
  },
  // 获取用户基本数据和头像信息
  async reqGetUserInfo(context, data) {
    // 解构
    const { data: res1 } = await reqGetUserInfo()
    // 传入id 并解构
    const { data: res2 } = await reqGetUserDetailById(res1.userId)
    const baseResult = {
      ...res1,
      ...res2
    }

    // const res2 = await reqGetUserDetailById()
    context.commit('setUserInfo', baseResult)
  },
  // 退出功能
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }

}

export default {
  // 开启命名空间·
  namespaced: true,
  state,
  mutations,
  actions
}
