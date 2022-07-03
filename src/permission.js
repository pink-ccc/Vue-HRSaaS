import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 定义白名单
const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面

// 导航前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  const token = store.getters.token
  // 判断有无token
  if (token) {
    // 判断是不是去登录页
    if (to.path === '/login') {
      next('/') // 引导到首页
      NProgress.done() // 进入页面后 关闭进度条
    } else {
    // 在此处获取ajax
      // 判断 如果没有数据 则获取数据
      if (!store.state.user.userInfo.userid) {
        // 此时返回是异步函数
        await store.dispatch('user/reqGetUserInfo')
      }
      next() // 放行
    }
  } else {
    // 看在不在白名单中(免登陆即可访问的页面)
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done() // 进入页面后 关闭进度条
    }
  }
})

// 导航后置守卫
router.afterEach((to, from) => {
  setTimeout(function() {
    NProgress.done() // 进入页面后 关闭进度条
  }, 1000)
})
