<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%;"
  >
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ nodeData.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部分</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { reqDelDepartments } from '@/api/departments'
export default {
  name: 'TreeTools',
  props: {
    // 定义传入的属性
    nodeData: {
      type: Object,
      required: true
    },
    // 是否根节点
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'del') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // 调用删除函数
        // console.log(this.nodeData)
          await reqDelDepartments(this.nodeData.id)
          this.$message.success('删除部门成功')
          // 子向父传值
          this.$emit('del-Departments')
        }).catch(() => {

        })
      }
      if (type === 'add') {
        this.$emit('add-Departments', this.nodeData)
      }
      if (type === 'edit') {
        this.$emit('edit-Departments', this.nodeData)
      }
    }
  }
}
</script>
