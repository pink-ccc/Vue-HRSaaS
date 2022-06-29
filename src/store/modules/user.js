// 导入封装的登录功能
import { reqLogin } from '@/api/user'
import { getToken } from '@/utils/auth'
import { setToken } from '@/utils/auth'

const state = () => {
  return {
    // 每次从Cookies中取出token
    token: getToken || null
  }
}

const mutations = {
  // 修改token的值
  setToken(state, newToken) {
    state.token = newToken
    // 将token保存至cookies中
    setToken(newToken)
  }

}

const actions = {
  // 发送 ajax
  async getToken(context, data) {
    const res = await reqLogin(data)
    context.commit('setToken', res.data.data)
  }
}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  mutations,
  actions
}
