<template>
  <uploadExcel :on-success="handleSuccess" />
</template>

<script>
import { reqImportEmployee } from '@/api/employee'
export default {
  computed: {
    type() {
      return this.$route.query.type
    }
  },
  methods: {
    async  handleSuccess({ header, results }) {
      if (this.type === 'user') {
        const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
        const newArr = []
        results.forEach(item => {
          const obj = {}
          for (const k in item) {
            if (['timeOfEntry', 'correctionTime'].includes(userRelations[k])) {
              obj[userRelations[k]] = this.formatExcelDate(item[k], '-')
            } else {
              obj[userRelations[k]] = item[k]
            }
          }
          newArr.push(obj)
        })
        await reqImportEmployee(newArr)
        this.$message.success('批量添加员工成功')
        this.$router.go(-1)
      }
    },
    formatExcelDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1) // 毫秒
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
