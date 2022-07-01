// 导入封装的登录功能
import { reqLogin, reqGetUserInfo, reqGetUserDetailById } from '@/api/user'
import { getToken } from '@/utils/auth'
import { setToken } from '@/utils/auth'

const state = () => {
  return {
    // 每次从Cookies中取出token
    token: getToken() || null,
    userInfo: {}
  }
}

const mutations = {
  // 修改token的值
  setToken(state, newToken) {
    state.token = newToken
    // 将token保存至cookies中
    setToken(newToken)
  },
  // 修改userInfo的值
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  }

}

const actions = {
  // 发送登录的 ajax
  async getToken(context, data) {
    const res = await reqLogin(data)
    context.commit('setToken', res.data)
  },
  // 发送获取用户信息ajax
  async getUserInfo(context) {
    const { data: res1 } = await reqGetUserInfo()

    const { data: res2 } = await reqGetUserDetailById(res1.userId)
    const baseResult = {
      ...res1,
      ...res2
    }
    context.commit('setUserInfo', baseResult)
  }
}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  mutations,
  actions
}
