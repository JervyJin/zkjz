<template>
  <div class="page">
    <el-form :inline="true" :model="formInline">
      <el-form-item label="任务名称:">
        <el-input v-model="formInline.taskName" placeholder="任务名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="执法对象:">
        <el-input v-model="formInline.legalObjName" placeholder="执法对象" clearable></el-input>
      </el-form-item>
      <el-form-item label="任务类型:">
        <el-select v-model="formInline.taskType" clearable placeholder="请选择任务类型">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.taskType" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="派发日期:" prop="finishTime">
        <el-date-picker type="daterange" range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="formInline.finishTime"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <!--<el-button icon="el-icon-download" @click="onSubmit">导出</el-button>-->
      </el-form-item>
    </el-form>
    <div class="tableWrap">
      <el-table class="table"
                :data="data.tableData"
                border
                height="100%"
                v-loading="data.loading" element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <!-- <el-table-column prop="urgency" label="预警类型">
          <template slot-scope="scope">
            <span :class="scope.row.urgency == 1 ? 'yellow' : scope.row.urgency == 2 ? 'blue' : 'red'">{{scope.row.warningType == 1 ? '黄' : scope.row.urgency == 2 ? '蓝' : '红'}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="toDetail(scope.row)">{{scope.row.taskName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="legalObjName" label="执法对象" show-overflow-tooltip></el-table-column>
        <el-table-column prop="taskTypeName" label="任务类型"></el-table-column>
        <el-table-column prop="requireFinishTime" label="要求完成日期"></el-table-column>
        <el-table-column prop="sponsorName" label="主办人"></el-table-column>
        <el-table-column prop="cosponsorName" label="协办人"></el-table-column>
        <el-table-column prop="dispatchDate" label="派发日期"></el-table-column>
        <el-table-column prop="urgencyName" label="紧急程度"></el-table-column>
        <el-table-column prop="isHandle" label="任务状态">
          <template slot-scope="scope">
            {{scope.row.isHandle == 'N' ? '执行中' : '已完成'}}
            <!--<el-tag size="mini" v-if="scope.row.issuspected==1">违法</el-tag>-->
          </template>
        </el-table-column>
        <el-table-column prop="isHandle" label="是否违法" v-if="isYb">
          <template slot-scope="scope">
            {{scope.row.issuspected === '1' ? '是' : '否'}}
          </template>
        </el-table-column>

        <!-- <el-table-column prop="isHandle" label="操作" v-if="isYb">
          <template slot-scope="scope">
            <span :class="scope.row.isHandle == 1 ? 'revertnot' : 'revert'">撤销</span>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <el-pagination
      background
      v-if="data.tableData.length"
      layout="total, sizes, prev, pager, next"
      :current-page="formInline.pageIndex"
      :page-size="formInline.pageSize"
      :total="page.total"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
export default {
  props: ['isYb'],
  data() {
    return {
      formInline: {
        taskName: '',
        legalObjName: '',
        taskType: '',
        dispatchTimeStart: '',
        dispatchTimeEnd: '',
        finishTime: [],
        userId: '',
        dbType: 0,
        pageIndex: 1,
        pageSize: 10
      },
      data: {
        loading: false,
        tableData: []
      },
      page: {
        total: 1
      },
      dicts: {
        taskType: [],
        // legalobjType: [],
        // urgency: []
      },
    }
  },
  created() {
    this.getDictData(3, 'taskType');
    this.$store.commit('setIsWF', 0);
    if (this.$route.query.id) {
      this.$ajax(url.getTaskDetailById, {id: this.$route.query.id}).then(res => {
        this.data.tableData = [res];
        this.page.total = 1;
      })
    } else {
      this.getData();
    }
  },
  computed: {
    isCX() {
      return this.$route.path.indexOf('rwcx') > -1
    },
    isChangeId () {
      return this.$route.query.id ? this.$route.query.id : '';
    }
  },
  watch: {
    /*isYb() {
      this.getData();
    },*/
    '$route' (to, from) {
      this.onReset();
    },
    isChangeId () {
      if (this.$route.query.id) {
        this.$ajax(url.getTaskDetailById, {id: this.$route.query.id}).then(res => {
          this.data.tableData = [res];
          this.page.total = 1;
        })
      } else {
        this.getData();
      }
    }
  },
  methods: {
    // 获取字典树
    getDictData(type, arr) {
      this.$ajax(url.getDictOption, {
        type: type
      }).then(res => {
        if (type === 3 && this.$route.path.indexOf('dbrw') > -1) {
          this.dicts[arr] = res.filter((item) => {
            return item.code !== '2';
          })
        } else {
          this.dicts[arr] = res;
        }
      })
    },
    getData() {
      this.data.loading = true;
      let id = this.$route.query.taskId || '';
      let data = {
        id: id,
        dbType: this.isYb ? 1 : this.isCX ? 2 : 0, // 0-待办 1-已办 2-查询全部
        taskName: this.formInline.taskName,
        legalObjName: this.formInline.legalObjName,
        taskType: this.formInline.taskType,
        dispatchTimeStart: (this.formInline.finishTime && this.formInline.finishTime.length) ? this.formInline.finishTime[0] : '',
        dispatchTimeEnd: (this.formInline.finishTime && this.formInline.finishTime.length) ? this.formInline.finishTime[1] : '',
        pageIndex: this.formInline.pageIndex,
        pageSize: this.formInline.pageSize
      }
      this.$ajax(url.getTaskList, data).then(res => {
        this.data.loading = false;
        this.data.tableData = res.data.list;
        this.page.total = res.data.total;
      })
    },
    onReset() {
      if (this.$route.query.id) {
        return false;
      }
      this.formInline = {
        taskName: '',
        legalObjName: '',
        taskType: '',
        dispatchTimeStart: '',
        dispatchTimeEnd: '',
        finishTime: '',
        userId: '',
        dbType: this.isYb ? 1 : this.isCX ? 2 : 0,
        pageIndex: 1,
        pageSize: 10
      }
      this.getData();
      this.getDictData(3, 'taskType');
    },
    onSubmit() {
      console.log('submit!');
    },
    toDetail(row) {
      this.$emit('showDetail', row)
    },
    currentChange(page) {
      this.formInline.pageIndex = page;
      this.getData();
    },
    sizeChange(size) {
      this.formInline.pageSize = size;
      this.getData();
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
