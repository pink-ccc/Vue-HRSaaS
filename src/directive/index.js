// 此文件保存 所有自定义指令
export const errorImg = {
  // 会在当前指令作用的dom元素 插入之后执行
  // el 指令所在的元素
  // binding 指令的相关信息对象, binding.value 指令的值
  inserted(el, bindings) {
    // 图片中有个错误指令：发现错误 则会执行以下函数
    el.onerror = function() {
      el.src = bindings.value
    }
  }
}

export const color = {
  // 会在当前指令作用的dom元素 插入之后执行
  // el 指令所在dom元素
  // bindings 里面是指令的参数信息对象
  inserted(el, bindings) {
    el.style.color = bindings.value
  }
}
