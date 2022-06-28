// 导入 Vue包
import Vue from 'vue'

// 重置全局的演示 相当于 base.css
import 'normalize.css/normalize.css'

// 导入element-ui 第三方的组件库并设置语言包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // 导入element-ui英语

// 设置全局的样式
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

// 导入svg精灵图
import '@/icons'
// 导入权限认证
import '@/permission'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
