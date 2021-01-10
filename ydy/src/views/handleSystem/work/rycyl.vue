<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员执行任务数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="创建时间:" prop="finishTime">
        <el-date-picker type="daterange" range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="formInline.finishTime"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <!--<el-button icon="el-icon-download">导出</el-button>-->
      </el-form-item>
    </el-form>
    <div class="tableWrap">
      <el-table class="table"
        :data="tableData"
        border
        show-summary
        height="100%"
        v-loading="loading" element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="name" label="区域"></el-table-column>
        <el-table-column prop="taskCount" label="总任务"></el-table-column>
        <el-table-column prop="userCount" label="总人数"></el-table-column>
        <el-table-column prop="ratio" label="人均任务数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
export default {
  data() {
    return {
      formInline: {
        finishTime: ''
      },
      loading: false,
      tableData: [
        // { name: '中原区', count: 500, joinnum: 30, averageTask: 20},
        // { name: '中原区', count: 500, joinnum: 30, averageTask: 20},
        // { name: '中原区', count: 500, joinnum: 30, averageTask: 20},
        // { name: '中原区', count: 500, joinnum: 30, averageTask: 20},
        // { name: '中原区', count: 500, joinnum: 30, averageTask: 20},
        // { name: '中原区', count: 500, joinnum: 30, averageTask: 20},
        // { name: '中原区', count: 500, joinnum: 30, averageTask: 20},
      ],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      let startTime = (this.formInline.finishTime && this.formInline.finishTime.length) ? formatDateToStr(this.formInline.finishTime[0]) : '';
      let endTime = (this.formInline.finishTime && this.formInline.finishTime.length) ? formatDateToStr(this.formInline.finishTime[1]) : '';
      this.$ajax(url.carryOutTask, {
        startTime,
        endTime
      }).then(res => {
        this.loading = false;
        if(res.success) {
          let data = res.data;
          data.forEach(v => {
            v.ratio = `${v.ratio}个`;
          })
          this.tableData = data;
          console.log(this.tableData)
        }
      })
    },
    getTotal(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '';
          return;
        }
        if (index === 1) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        // if (column.property === 'num') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        // }
      });

      return sums;
    },
    onSubmit() {
      this.getData();
    },
    onReset() {
      this.formInline.finishTime = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    .el-pagination{
      float: right;
      margin-top: 24px;
    }
    /deep/ .el-table__footer-wrapper{
      position: fixed;
    }
  }
  .tableWrap {
    height: calc(100vh - 255px);
    /*overflow: auto;*/
  }
</style>
