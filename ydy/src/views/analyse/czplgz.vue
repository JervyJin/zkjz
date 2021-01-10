<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>移动污染源车主批量告知</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :inline="true" :model="query">
      <el-form-item label="号牌号码：">
        <el-input v-model="query.cph" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
          v-model="query.date"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="短信类型：" prop="dxlx">
        <el-select v-model="query.dxlx" placeholder="请选择短信类型">
          <el-option :label="'遥感监测'" :value="'遥感监测'" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="告知状态：" prop="isNotify">
        <el-select v-model="query.isNotify" placeholder="告知状态">
          <el-option :label="'已告知'" :value="'1'" ></el-option>
          <el-option :label="'发送失败'" :value="'2'" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <!--<el-button @click="push">批量告知</el-button>-->
      </el-form-item>
    </el-form>
    <div class="tableWrap">
      <el-table
        :data="tableData"
        border
        stripe
        height="100%"
        @selection-change="handleSelectionChange"
        v-loading="loading" element-loading-text="拼命加载中"
      >
        <el-table-column type="index" width="55" label="序号"></el-table-column>
        <!--<el-table-column prop="areaName" label="车辆所属区域" show-overflow-tooltip></el-table-column>-->
        <el-table-column prop="dxlx" label="短信类型"></el-table-column>
        <el-table-column prop="cphm" label="车牌号码"></el-table-column>
        <el-table-column prop="owerName" label="车主姓名"></el-table-column>
        <!--<el-table-column prop="phone" label="车主联系方式"></el-table-column>-->
        <el-table-column prop="cbsj" label="超标时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cbwrw" label="超标污染物"></el-table-column>
        <el-table-column prop="pushOrgName" label="推送部门" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isNotify" label="告知状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isNotify === '1'">已告知</span>
            <span v-if="scope.row.isNotify !== '1'" style="color: red;">发送失败</span>
          </template>
        </el-table-column>
        <el-table-column prop="sbyymc" label="失败原因" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="80">
          <template slot-scope="scope">
            <el-button v-if="scope.row.sbyy === '1'" type="primary" plain style="padding: 7px 10px;"
                       @click="restartSend(scope.row)">重新发送</el-button>
            <span v-if="scope.row.sbyy === '2'">无法操作</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :total="page.total"
      @current-change="currentChange"
      @size-change="sizeChange"
      v-if="page.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';
export default {
  data() {
    return {
      query: {
        cph: '',
        date: [],
        dxlx: '',
        isNotify: ''
      },
      page: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      loading: false,
      tableData: [],
      selectedArr: []
    }
  },
  created() {
    this.getData();
  },
  methods: {
    // 重置
    onReset() {
      this.query = {
        cph: '',
        date: [],
        dxlx: '',
        isNotify: ''
      }
      this.page.pageSize = 10;
      this.page.pageIndex = 1;
      this.getData();
    },
    getData() {
      this.loading = true;
      let data = {
        cph: this.query.cph,
        dxlx: this.query.dxlx,
        isNotify: this.query.isNotify,
        dateStart: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        dateEnd: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : '',
        pageSize: this.page.pageSize,
        pageIndex: this.page.pageIndex
      }
      this.$ajax(url.getNotifyData, data).then(res => {
        this.loading = false;
        if(res.success) {
          this.tableData = res.data.list || [];
          this.page.total = res.data.total;
        }
      });
    },
    search() {
      this.getData();
    },
    handleSelectionChange(val) {
      this.selectedArr = val;
    },
    // 批量推送
    push() {
      if(!this.selectedArr.length) {
        this.$message({
          type: 'info',
          message: '选择要批量告知的数据!'
        })
        return;
      }
      let ids = this.selectedArr.map(v  => v.id).join()
      this.$ajax(url.setNotify, {ids}).then(res => {
        if(res.success) {
          this.$message({
            type: 'success',
            message: '批量告知成功!'
          })
        }
      });
    },
    currentChange(page) {
      this.page.pageIndex = page;
      this.getData();
    },
    sizeChange(size) {
      this.page.pageSize = size;
      this.getData();
    },
    restartSend (v) {
      this.$ajax(url.setNotify, v).then(res => {
        if (res.success) {
          this.getData();
          this.$message({
            type: 'success',
            message: '发送成功!'
          })
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    // height: calc(100vh - 100px);
    height: 100%;
    .el-table{
      margin-top: 15px;
    }
    .el-pagination{
      margin-top: 15px;
      float: right;
    }
  }
  .tableWrap {
    height: calc(100vh - 300px);
    /*overflow: auto;*/
  }
</style>
