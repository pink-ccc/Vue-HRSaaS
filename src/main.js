import Vue from 'vue'

// 重置css样式
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 导入axios实例
import request from './utils/request'
Vue.prototype.$http = request
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 全局自定义指令 导入自定义指令
import * as directive from '@/directive'
// 遍历对象 此时可以使用所有的自定义指令1
for (const k in directive) {
  Vue.directive(k, directive[k])
}

// 方法2
// Object.keys(directive).forEach((key) => {
//   Vue.directive(key, directive[key])
// })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
