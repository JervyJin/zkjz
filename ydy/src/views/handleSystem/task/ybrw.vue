<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>已办任务</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="任务名称:">
        <el-input v-model="formInline.taskName" placeholder="任务名称"></el-input>
      </el-form-item>
      <el-form-item label="执法对象:">
        <el-input v-model="formInline.legalObjName" placeholder="执法对象"></el-input>
      </el-form-item>
      <el-form-item label="任务类型:">
        <el-select v-model="formInline.taskType" placeholder="任务类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="派发人:">
        <el-select v-model="formInline.userId" placeholder="派发人">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="派发时间段:" prop="finishTime">
        <el-date-picker type="daterange" range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="formInline.finishTime"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button @click="onSubmit">重置</el-button>
        <!--<el-button @click="onSubmit">导出</el-button>-->
      </el-form-item>
    </el-form>
    <div class="tableWrap">
    <el-table class="table"
      size="mini"
      :data="data.tableData"
      border
      height="100%"
      :loading="data.loading"
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <!-- <el-table-column prop="urgency" label="预警类型">
        <template slot-scope="scope">
          <span :class="scope.row.urgency == 1 ? 'yellow' : scope.row.urgency == 2 ? 'blue' : 'red'">{{scope.row.warningType == 1 ? '黄' : scope.row.urgency == 2 ? '蓝' : '红'}}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="legalObjName" label="执法对象"></el-table-column>
      <el-table-column prop="taskTypeName" label="任务类型"></el-table-column>
      <el-table-column prop="sponsorName" label="主办人"></el-table-column>
      <el-table-column prop="cosponsorName" label="任务协办人"></el-table-column>
      <el-table-column min-width="85" prop="requireFinishTime" label="要求完成时间"></el-table-column>
      <el-table-column prop="dispatchDate" label="派发时间"></el-table-column>
      <el-table-column prop="urgencyName" label="紧急程度"></el-table-column>
      <el-table-column prop="isHandle" label="任务状态">
        <template slot-scope="scope">
          {{scope.row.isHandle == 'N' ? '执行中' : '已完成'}}
        </template>
      </el-table-column>
      <el-table-column prop="isHandle" label="处理结果">
        <template slot-scope="scope">
          {{scope.row.isHandle == 'N' ? '未处理' : '已处理'}}
        </template>
      </el-table-column>
      <el-table-column prop="isHandle" label="操作">
        <template slot-scope="scope">
          <span :class="scope.row.isHandle == 1 ? 'revertnot' : 'revert'">撤销</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <el-pagination background
      layout="total, sizes, prev, pager, next"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
export default {
  data() {
    return {
      formInline: {
        taskName: '',
        legalObjId: '',
        taskType: '',
        userId: '',
        finishTime: ''
      },
      data: {
        loading: false,
        tableData: []
      },
      page: {
        pageSize: 10,
        pageIndex: 1,
        total: 1
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.data.loading = true;
      let data = {
        dbType: 1, // 0-待办 1-已办 2-查询全部
        pageSize: this.page.pageSize,
        pageIndex: this.page.pageIndex
      }
      this.$ajax(url.getTaskList, data).then(res => {
        this.data.loading = false;
        this.data.tableData = res.list;
        this.page.total = res.total;
      })
    },
    getLegalObject() {
      this.$ajax(url.getLegalObject, data).then(res => {
        this.data.loading = false;
        this.data.tableData = res.list;
        this.page.total = res.total;
      })
    },
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    // /deep/ .el-form-item--mini .el-form-item__content, /deep/ .el-input.el-input--mini.el-input--suffix{
    //   width: 150px;
    // }
    // /deep/ .el-range-editor--mini.el-input__inner{
    //   width: 228px;
    // }
    // .btns{
    //   float: right;
    //   /deep/ .el-form-item__content{
    //     width: 100%;
    //     .el-button--mini{
    //       width: 80px;
    //       overflow: hidden;
    //     }
    //   }
    // }
    /deep/ .table {
      tbody{
        td:nth-of-type(2) {
          color: #1890FF;
          cursor: pointer;
        }
        // td:nth-of-type(4) {
        //   color: #1890FF;
        // }
      }
      .yellow::before{
        background: #FFC000;
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 8px;
        border-radius: 3px;
        vertical-align: middle;
        content: '';
      }
      .red::before{
        background: #D93026;
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 8px;
        border-radius: 3px;
        vertical-align: middle;
        content: '';
      }
      .blue::before{
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 8px;
        border-radius: 3px;
        vertical-align: middle;
        background: #1890FF;
        content: '';
      }
      .revertnot{
        color: #ccc;
      }
      .revert{
        cursor: pointer;
        color: #1890FF;
      }
    }
    .el-pagination{
      float: right;
      margin-top: 24px;
    }
  }
  .tableWrap {
    height: calc(100vh - 300px);
    /*overflow: auto;*/
  }
</style>
