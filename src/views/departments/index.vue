<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 公司名称 -->
        <!-- 子向父传值 因为 -->
        <tree-tools :node-data="company" :is-root="true" />
        <!-- props绑定自定义属性 -->
        <!-- 放置一个el-tree组件 -->
        <el-tree
          :data="list"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 使用作用域插槽 -->
          <template v-slot="{data}">
            <!-- 部门名称 -->
            <TreeTools :node-data="data" @del-Departments="getDepartments" @add-Departments="addDepartments" />
          </template>
        </el-tree>
        <!-- 控制添加部门弹出框组件 -->
        <add-dept :show-dialog="showDialog" @add-handleClose="showDialog=false" />
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
      list: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: { name: '大聪明控股有限集团', manager: '负责人' },
      showDialog: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取企业部门信息函数
    async getDepartments() {
      const { data: res } = await reqGetDepartments()
      this.company = { name: res.companyName, manager: '负责人' }
      this.list = tranListToTreeData(res.depts, '')
    },
    // 添加部门对话框
    addDepartments() {
      this.showDialog = true
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
