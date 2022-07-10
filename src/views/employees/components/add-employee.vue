<template>
  <el-dialog
    top="3vh"
    title="提示"
    :visible="showDialog"
    width="50%"
    @close="closeDialog"
    @click.native="showTree=false"
  >
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:70%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:70%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:70%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:70%" placeholder="请选择">
          <el-option v-for="item in Employees.hireType" :key="item.id" v-model="item.id" :label="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:70%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:70%" placeholder="请选择部门" @click.native.stop="getDepartment" />
        <el-tree v-if="showTree" :data="treeData" :props="{label:'name'}" @node-click="handleNodeClick" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:70%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Employees from '@/api/constant/employees'
import { tranListToTreeData } from '@/utils/index'
import { reqGetDepartments } from '@/api/departments'
import { reqGetEmployee } from '@/api/employee'
export default {
  name: 'Employee',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Employees,
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      },
      // 树状数据用于渲染部门
      treeData: [],
      showTree: false
    }
  },
  methods: {
    // 关闭对话框时的执行的函数
    closeDialog() {
      // 父组件使用sync 子组件可控制父组件的变量
      this.$emit('update:showDialog', false)
      this.$refs.addForm.resetFields()
    },
    // 用于渲染部门树形数据的函数
    async getDepartment() {
      this.showTree = !this.showTree
      const { data: { depts }} = await reqGetDepartments()
      this.treeData = tranListToTreeData(depts, '')
    },
    // 点击树状节点得到节点信息
    handleNodeClick(data) {
      // 如果有子部门 则只能选择子部门
      if (data.children) return
      this.formData.departmentName = data.name
      this.showTree = false
    },
    // 点击确定提交表格
    submit() {
      this.$refs.addForm.validate(async(valid) => {
        if (!valid) return
        await reqGetEmployee(this.formData)
        this.$message.success('添加员工成功')
        // 清空数据 关闭弹窗
        this.closeDialog()
        // 调用父组件的函数 从新获取数据
        this.$parent.getEmployeeList()
      })
    }

  }

}
</script>

<style>

</style>
