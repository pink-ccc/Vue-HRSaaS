<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading" class="tree-card">
        <!-- 公司名称 -->
        <!-- 子向父传值 因为 -->
        <tree-tools :node-data="company" :is-root="true" @add-Departments="addDepartments" />
        <!-- :props 绑定自定义属性 -->
        <!-- :data 树形组件的数据 -->
        <el-tree
          :data="list"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 使用作用域插槽 -->
          <template v-slot="{data}">
            <!-- 部门名称 -->
            <TreeTools
              :node-data="data"
              @del-Departments="getDepartments"
              @add-Departments="addDepartments"
              @edit-Departments="editDepartments"
            />

          </template>
        </el-tree>
        <!-- 控制添加部门弹出框组件 -->
        <add-dept
          ref="addDept"
          :show-dialog.sync="showDialog"
          :node-data="nodeData"
          :new-list="newList"
          @addDept="getDepartments"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { tranListToTreeData } from '@/utils/index'
import { reqGetDepartments } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      // 部门信息树状数据
      list: [],
      // 绑定子数据r
      defaultProps: {
        label: 'name',
        nodeData: {},
        children: 'children'
      },
      company: { name: '大聪明控股有限集团', manager: '负责人' },
      showDialog: false,
      nodeData: {},
      // 部门信息原数据
      newList: [],
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取企业部门信息函数
    async getDepartments() {
      this.loading = true
      const { data: res } = await reqGetDepartments()
      this.newList = res.depts
      this.company = { name: res.companyName, manager: '负责人', id: '' }
      this.list = tranListToTreeData(res.depts, '')
      this.loading = false
    },
    // 添加部门对话框
    addDepartments(nodeData) {
      this.showDialog = true
      this.nodeData = nodeData
      // 调用addDept组件的函数 由于diglog为异步函数 则需要调用$nextTick方法
      this.$nextTick(() => {
        this.$refs.addDept.getEmployee()
      })
    },
    // 编辑添加弹出对话框
    editDepartments(nodeData) {
      this.showDialog = true
      this.nodeData = nodeData
      // 调用addDept组件函数 获取部门信息
      this.$nextTick(() => {
        this.$refs.addDept.editDepartment()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.tree-card {
  padding: 30px 30px;
  font-size:14px;
}
.el-tree {
  // 样式穿透
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}

</style>
