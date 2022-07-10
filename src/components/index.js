// 引入需要全局注册的组件
import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel'

// 向外导出 install 方法(固定写法) 在其里面注册全局组件
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
