<template>
  <div class="employees-container">
    <div class="app-container">

      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>

        <template #right>
          <el-button type="warning" size="small" @click="$router.push('./import?type=user')">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="showDialog=true">新增员工</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table v-loading="loading" border :data="employeeList">
          <!-- type属性绑定的自定义索引值 -->
          <el-table-column label="序号" type="index" sortable="" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="手机号" prop="mobile" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            sortable=""
            :formatter="formatter"
          />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
            <template v-slot="{row}">
              {{ editTime(row.timeOfEntry) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <!-- 使用作用域插槽 得到当前点击的那一列数据 -->
            <template v-slot="scoped">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmplovee(scoped.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="size"
            :current-page="page"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>

      <add-employee :show-dialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import employees from '@/api/constant/employees'
import PageTools from '@/components/PageTools/index.vue'
import { reqGetEmployeeList, reqDelEmployee } from '@/api/employee'
import AddEmployee from './components/add-employee.vue'
export default {
  components: { PageTools, AddEmployee },
  data() {
    return {
      loading: false,
      page: 1, // 页码
      size: 5, // 每页条数
      employeeList: [], // 控制渲染员工数据列表
      total: 0, // 一共有多少条数据
      showDialog: false // 控制添加员工的弹窗
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取员工的列表
    async getEmployeeList() {
      this.loading = true
      const { data: { rows, total }} = await reqGetEmployeeList(this.page, this.size)
      this.employeeList = rows
      this.total = total
      this.loading = false
    },
    // 删除员工列表
    delEmplovee(id) {
      this.$confirm('是否删除此数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 发送删除axios
        await reqDelEmployee(id)
        // 提示用户
        this.$message.success('删除员工成功')
        if (this.employeeList.length === 1 && this.page > 1) this.page--
        this.getEmployeeList()
      })
    },
    // 当前页码发生改变时 调用的函数
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getEmployeeList()
    },
    // 格式化聘请方式数据函数
    formatter(row, column, cellValue, index) {
      const obj = employees.hireType.find(item => item.id === +cellValue)
      return obj ? obj.value : '未知'
    },
    // 格式化时间执行函数
    editTime(time) {
      return dayjs(time).format('YYYY年MM月DD日')
    }
  }
}
</script>

<style>

</style>
