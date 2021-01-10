<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>移动污染源案件推送</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="query" ref="queryForm">
      <el-form-item label="被举报单位名称：">
        <el-input v-model="query.bjbdwmc" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="处理状态：">
        <el-select v-model="query.status" placeholder="请选择处理状态">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.caseStatus" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
          v-model="query.date"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <!--<el-button>批量推送</el-button>-->
      </el-form-item>
    </el-form>
    <div class="tableWrap">
      <el-table
        :data="tableData"
        border
        stripe
        height="100%"
        v-loading="loading" element-loading-text="拼命加载中"
      >
        <el-table-column align="center" type="index" width="45" label="序号"></el-table-column>
        <el-table-column prop="bjbdwmc" label="被举报单位名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bjbdwdz" label="被举报单位地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ssqymc" label="所属区域" show-overflow-tooltip></el-table-column>
        <el-table-column prop="jbnr" label="举报内容" show-overflow-tooltip></el-table-column>
        <el-table-column prop="jbsj" label="举报时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="jblxmc" label="举报类型名称" show-overflow-tooltip align="center"></el-table-column>
        <!-- <el-table-column prop="content" label="处理建议" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.status"></span>
            <span v-else>
            {{scope.row.content}}
          </span>
          </template>
        </el-table-column> -->
        <el-table-column prop="status" label="处理状态" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.status">未处理</span>
            <span v-else>
            {{scope.row.status == 1 ? '已处理' : scope.row.status == 2 ? '不处理' : '未处理'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button v-if="scope.row.status != 1" type="primary" plain @click="handle(scope.row)">操作</el-button> -->
            <!-- <el-button v-if="scope.row.status == 1" type="text">处理意见</el-button>
            <el-button v-if="scope.row.status == 1" type="text">发送短信</el-button> -->
            <el-button type="text" v-if="scope.row.status != 1" @click="handle(scope.row,1)">处理意见</el-button>
            <el-button type="text" v-if="scope.row.status != 1" @click="handle(scope.row,2)">发送短信</el-button>
            <el-button type="text" v-if="scope.row.status != 1" @click="goto_rwpf(scope.row)">派发</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      :current-page="query.page"
      :page-size="query.pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :total="dataTotal"
      v-if="dataTotal">
    </el-pagination>

    <el-dialog append-to-body :visible.sync="showDialog" :title="title" width="500px">
      <!-- <el-radio v-model="isHandle" label="1">处理</el-radio>
      <el-radio v-model="isHandle" label="2">不处理</el-radio> -->
      <div class="handle-advice"  v-if="isHandle=='1'">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入意见"
          v-model="content">
        </el-input>
      </div>
      <div v-else>
        <el-form :model="form">
        <!-- <el-form-item label="车牌号：">
          <el-input v-model="form.cph"></el-input>
        </el-form-item> -->
        <el-form-item label="被举报单位名称：">
          <el-input v-model="form.bjbdwmc"></el-input>
        </el-form-item>
        <el-form-item label="被举报单位地址：">
          <el-input v-model="form.bjbdwdz"></el-input>
        </el-form-item>
        <el-form-item label="所属区域：">
          <el-input v-model="form.ssqymc"></el-input>
        </el-form-item>
        <el-form-item label="举报内容：">
          <el-input v-model="form.jbnr"></el-input>
        </el-form-item>
        <el-form-item label="举报时间：">
          <el-input v-model="form.jbsj"></el-input>
        </el-form-item>
        
      </el-form>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button type="default" @click="showDialog=false;">取消</el-button>
        <el-button type="primary" @click="confirm()">确认</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import { formatDateToStr } from "@/utility/utility.js";
export default {
  data() {
    return {
      query: {
        bjbdwmc: '',
        status: '0',
        date: [],
        page: 1,
        pageSize: 10,

      },
      content:'',
      form:{},
      loading: false,
      tableData: [],
      showDialog: false,
      title: '',
      isHandle: null,

      id: '',
      dataTotal: 0,
      dicts: {
        caseStatus: [
          {id: 0, name: '未处理', code: '0'},
          {id: 1, name: '处理', code: '1'},
          {id: 2, name: '不处理', code: '2'}
        ]
      }
    }
  },
  created () {
    this.getList();
  },
  methods: {
    onReset() {
      this.query = {
        bjbdwmc: '',
        status: '0',
        date: [],
        page: 1,
        pageSize: 10,
      }
      this.getList();
    },
    // 分页获取表格数据
    getList () {
      this.loading = true;
      let data = {
        bjbdwmc: this.query.bjbdwmc,
        status: this.query.status,
        startTime: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        endTime: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : '',
        page: this.query.page,
        pageSize: this.query.pageSize
      }
      this.$ajax(url.casePushList, data).then(res => {
        this.loading = false;
        this.tableData = res.data.list;
        this.dataTotal = res.data.total;
      });
    },
    // 打开操作弹框
    handle (ev,num) {
      console.log(ev,num)
      this.showDialog = true;
      if(num ==1){
        this.title = '操作处理'
         this.id = ev.dwd_zjid;
         
      this.isHandle = 1;
      // console.log(this.isHandle)
      } else if (num==2){
        this.isHandle = 2;
        this.title = '发送短信'
        this.form = {
          dwd_zjid: this.id,
          dxlx:2,
          bjbdwmc:ev.bjbdwmc,
          bjbdwdz :ev.bjbdwdz,
          ssqymc :ev.ssqymc,
          jbnr :ev.jbnr,
          jbsj:ev.jbsj
        }
      }
     
    },
    // 操作弹框做确认操作
    confirm () {
      if(this.isHandle==1){
        let query = {
        dwd_zjid: this.id,
        status: this.isHandle,
        content: this.content
      };
      this.$ajax(url.handlingCases, query).then(res => {
        this.showDialog = false;
        this.getList();
      });
      }else if (this.isHandle==2){
        this.$ajax(url.handlingCases, this.form).then(res => {
        this.showDialog = false;
        this.getList();
      });
      }

    },
    // 派发
    goto_rwpf(set_rwpfRow){
      this.$store.commit("set_rwpfRow",set_rwpfRow || {});
      this.$router.push({path:"/zfxt/rwpf"})
    },
    // 分页参数变动触发
    handleCurrentChange (val) {
      this.query.page = val;
      this.getList();
    },
    handleSizeChange (size) {
      this.query.pageSize = size;
      this.getList();
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    .searchBox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-input{
        width: 150px;
      }
      .el-range-editor--mini.el-input__inner{
        width: 280px;
      }
    }
    .el-table{
      margin-top: 15px;
    }
    .el-pagination{
      margin-top: 15px;
      float: right;
    }
  }
  .handle-advice{
    margin-top: 20px;
  }
  .tableWrap {
    height: calc(100vh - 300px);
    /*overflow: auto;*/
  }
</style>
