<template>
  <div class="page">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="任务名称:">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="执法对象:">
        <el-select v-model="formInline.obj" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务类型:">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="要求完成时间:" prop="finishTime">
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
    <el-table class="table"
      size="mini"
      :data="tableData"
      border
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="warningType" label="预警类型">
        <template slot-scope="scope">
          <span :class="scope.row.warningType == 1 ? 'yellow' : scope.row.warningType == 2 ? 'blue' : 'red'">{{scope.row.warningType == 1 ? '黄' : scope.row.warningType == 2 ? '蓝' : '红'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="taskName" label="任务名称">
        <template slot-scope="scope">
          <span>{{scope.row.taskName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="handleObj" label="执法对象"></el-table-column>
      <el-table-column prop="taskType" label="任务类型"></el-table-column>
      <el-table-column prop="finishTime" label="要求完成时间"></el-table-column>
      <el-table-column prop="lastWorker" label="上一阶段办理人"></el-table-column>
      <el-table-column prop="sendTime" label="派发时间"></el-table-column>
      <el-table-column prop="status" label="任务状态">
        <template slot-scope="scope">
          {{scope.row.status == 0 ? '执行中' : '已完成'}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
      layout="total, sizes, prev, pager, next"
      :total="50">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        obj: '',
        region: '',
        finishTime: ''
      },
      tableData: [
        { warningType: 1, taskName: "这是任务名称。。。", handleObj: "始祖山", taskType: '双随机任务', finishTime: '2020.4.20', lastWorker: '阿辉', sendTime: '2020.3.20', status: 0 },
        { warningType: 1, taskName: "这是任务名称。。。", handleObj: "始祖山", taskType: '双随机任务', finishTime: '2020.4.20', lastWorker: '阿辉', sendTime: '2020.3.20', status: 1 },
        { warningType: 2, taskName: "这是任务名称。。。", handleObj: "始祖山", taskType: '双随机任务', finishTime: '2020.4.20', lastWorker: '阿辉', sendTime: '2020.3.20', status: 1 },
        { warningType: 3, taskName: "这是任务名称。。。", handleObj: "始祖山", taskType: '双随机任务', finishTime: '2020.4.20', lastWorker: '阿辉', sendTime: '2020.3.20 ', status: 0 }
      ],
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    /deep/ .el-form-item--mini .el-form-item__content, /deep/ .el-input.el-input--mini.el-input--suffix{
      width: 150px;
    }
    /deep/ .el-range-editor--mini.el-input__inner{
      width: 228px;
    }
    .btns{
      float: right;
      /deep/ .el-form-item__content{
        width: 100%;
        .el-button--mini{
          width: 80px;
          overflow: hidden;
        }
      }
    }
    /deep/ .table {
      tbody{
        td:nth-of-type(3) {
          color: #1890FF;
          cursor: pointer;
        }
        td:nth-of-type(4) {
          color: #1890FF;
        }
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
    }
    .el-pagination{
      float: right;
      margin-top: 24px;
    }
  }
</style>
