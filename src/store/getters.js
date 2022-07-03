const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 将token 赋值给 全局的 getters
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  staffphoto: state => state.user.userInfo.staffPhoto

}

export default getters
