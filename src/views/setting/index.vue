<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" size="small" @click="showDialog = true">+新增角色</el-button>
          <el-table
            v-loading="loading"
            :data="roleList"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="120"
            />
            <el-table-column
              prop="name"
              label="角色名称"
              width="240"
            />
            <el-table-column
              prop="description"
              label="描述"
            />
            <el-table-column
              label="操作"
            >
              <template v-slot="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editSetting(row.id)">编辑</el-button>
                <el-button size="small" type="danger" @click="delSetting(row.id)">删除</el-button>
              </template>

            </el-table-column>
          </el-table>
          <!--
  属性:
    1. current-page 标记当前页 (谁高亮)
    2. page-sizes 可供选择的每页条数列表
    3. page-size 起作用的每页条数
    4. layout 布局, 控制是展示的控件列表布局
    5. total 总条数
  方法:
    @size-change="handleSizeChange" 每页条数变化
    @current-change="handleCurrentChange" 当前页变化
-->
          <el-pagination
            :current-page="page"
            :page-sizes="[3, 6, 10,]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
          <el-dialog
            :title="title"
            :visible="showDialog"
            width="50%"
            :close-on-click-modal="false"
            @close="closeDiglog"
          >
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="角色描述" prop="description">
                <el-input v-model="form.description" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="closeDiglog">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">

          <!-- 警告信息 -->
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <!-- 表单 -->
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyForm.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyForm.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyForm.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyForm.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>

        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reqGetRoleList, delRole, addRole, getRole, editRole } from '@/api/setting'
import { reqGetCompanyById } from '@/api/company'
import { mapState } from 'vuex'
export default {
  naem: 'setting',
  data() {
    return {
      activeName: 'first',
      roleList: [],
      total: 0, // 总数据
      page: 1, // 页码
      pagesize: 3, // 每页显示的条数
      showDialog: false, // 控制对话框的变量
      loading: false,
      // 表单数据对象
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      companyForm: {}
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    title() {
      return this.form.id ? '编辑部门' : ' 添加部门'
    }
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    // 获取公司设置数据
    async getRoleList() {
      this.loading = true
      const { data: { rows, total }} = await reqGetRoleList(this.page, this.pagesize)
      this.roleList = rows
      this.total = total
      this.loading = false
    },
    // 每页条数发生改变执行的函数
    handleSizeChange(newPagesize) {
      // 将修改的每条条数重新赋值
      this.pagesize = newPagesize
      // 重新请求数据
      this.getRoleList()
    },
    // 当前页码发生改变时执行的函数
    handleCurrentChange(newPage) {
      this.page = newPage
      // 重新请求数据
      this.getRoleList()
    },
    // 删除功能
    delSetting(id) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 发送删除axios
        await delRole(id)
        // 提示用户
        this.$message.success('删除角色成功')
        if (this.roleList.length === 1 && this.page > 1) this.page--
        // 重新获取数据
        this.getRoleList()
      }).catch(() => {
      })
    },
    // 关闭对话框执行的回调
    closeDiglog() {
      this.showDialog = false
      this.$refs.ruleForm.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    // title() {
    //   return
    // }
    // 点击确定执行的函数
    submit() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return
        if (this.form.id) {
          // 发送ajax
          await editRole(this.form)
          this.$message.success('编辑角色成功')
        } else {
          // 发送ajax
          await addRole(this.form)
          this.$message.success('添加角色成功')
        }
      })
      // 重新请求数据
      this.getRoleList()
      // 关闭弹窗 清空数据
      this.closeDiglog()
    },
    // 编辑功能
    async editSetting(id) {
      this.showDialog = true
      const res = await getRole(id)
      this.form = res.data
    },
    // 公司信息函数
    async getCompanyInfo() {
      const { data } = await reqGetCompanyById(this.userInfo.companyId)
      this.companyForm = data
    }

  }
}
</script>

<style>

</style>
