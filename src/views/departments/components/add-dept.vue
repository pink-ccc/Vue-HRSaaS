<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="handleCloseDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="ruleForm" label-width="120px" :model="form" :rules="formRules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in emploteeList" :key="item.id" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <div slot="footer">
      <el-button type="primary" size="small" @click="SubmitData">确定</el-button>
      <el-button size="small" @click="handleCloseDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDepartment, reqGetDepartDetail, reqEditDepartment } from '@/api/departments'
import { getEmployeeInfo } from '@/api/employee'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      required: true
    },
    newList: {
      type: Array,
      required: true
    }
  },
  data() {
    // 自定义校验规则1 同级部门禁止出现重复部门
    const checkName = (rule, value, callback) => {
      // 如果是编辑功能 则不修改部门可以放行
      if (this.form.id) {
        if (this.nodeData.name === value) {
          callback()
          return
        }
        const arr = this.newList.filter(item => item.pid === '')
        const flag = arr.some(item => item.name === value)
        flag ? callback(new Error('部门名称不能相同')) : callback()
      } else {
        // 因为所有的1级菜单的pid属性为空 判断添加功能的
        const arr = this.newList.filter(item => item.pid === '')
        const flag = arr.some(item => item.name === value)
        flag ? callback(new Error('部门名称不能相同')) : callback()
      }
    }
    // 自定义校验规则2 部门编码在整个模块中都不允许重复
    const checkCode = (rule, value, callback) => {
      // 添加功能
      if (this.form.id && this.form.code === value) {
        callback()
        return
      }
      const flag = this.newList.some((item) => item.code === value)
      flag ? callback(new Error('部门编码不能相同')) : callback()
    }
    return {
      // 定义表单校验对象
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 表单校验对象
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ]

      },
      //
      emploteeList: []

    }
  },
  computed: {
    showTitle() {
      // 因为编辑部门有id属性
      return this.form.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    // 关闭对话框执行的函数
    handleCloseDialog() {
      // 子向父传值 父组件执行子子组件里函数
      this.$emit('update:showDialog', false)
      // 重置表单数据
      this.$refs.ruleForm.resetFields()
      // 重置数据
      this.form = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 管理者
        introduce: '' // 部门介绍
      }
    },
    // 获取员工简单数据列表函数
    async getEmployee() {
      const res = await getEmployeeInfo()
      this.emploteeList = res.data
    },
    // 点击确定提交弹出框
    SubmitData() {
      // 如果form表单有id则为编辑功能不然则为添加功能
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return
        if (this.form.id) {
          await reqEditDepartment(this.form)
          // 提示用户
          this.$message.success('编辑部门成功')
        } else {
          await getDepartment({ ...this.form, pid: this.nodeData.id })
          // 提示用户
          this.$message.success('新增部门成功')
        }
        // 关闭弹窗
        this.handleCloseDialog()
        // 重新刷新页面
        this.$emit('addDept')
      })
    },
    // 修改部门信息函数
    async editDepartment() {
      // console.log(this.nodeData)
      const { data } = await reqGetDepartDetail(this.nodeData.id)
      this.form = data
    }
  }
}
</script>

<style>

</style>
