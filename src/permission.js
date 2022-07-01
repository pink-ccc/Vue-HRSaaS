// 路由前置守卫
// 进行登录拦截的控制 (后面自己写)
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面

// 导航前置守卫
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  store.dispatch('user/getUserInfo')
  // 开启进度条
  NProgress.start()
  // 判断有无token
  if (token) {
    // 判断是不是去登录页
    if (to.path === '/login') {
      next('/') // 引导到首页
      // 跳到首页，被next拦截走的，不会自动关闭，因为没有进入到afterEach，则需要手动关闭
      NProgress.done()
    } else {
      next() // 放行
    }
  } else {
    // 看在不在白名单中(免登陆即可访问的页面)
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 导航后置守卫
router.afterEach((to, from) => {
  // 关闭进度条
  NProgress.done()
})
