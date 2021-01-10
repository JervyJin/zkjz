<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务完成率</el-breadcrumb-item>
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
      <el-form-item class="btns">
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <!--<el-button icon="el-icon-download">导出</el-button>-->
      </el-form-item>
    </el-form>
    <!-- <el-table class="table"
      show-summary
      :data="tableData"
      border
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="district" label="区域"></el-table-column>
      <el-table-column label="所有任务" align="center">
        <el-table-column width="50" prop="all_times" label="下达次数"></el-table-column>
        <el-table-column width="50" prop="all_finish" label="完成次数"></el-table-column>
        <el-table-column width="55" prop="all_rate" label="完成率(%)"></el-table-column>
      </el-table-column>
      <el-table-column label="双随机任务" align="center">
        <el-table-column width="50" prop="ssj_times" label="下达次数"></el-table-column>
        <el-table-column width="50" prop="ssj_finish" label="完成次数"></el-table-column>
        <el-table-column width="55" prop="ssj_rate" label="完成率(%)"></el-table-column>
      </el-table-column>
      <el-table-column label="专项行动" align="center">
        <el-table-column width="50" prop="zx_times" label="下达次数"></el-table-column>
        <el-table-column width="50" prop="zx_finish" label="完成次数"></el-table-column>
        <el-table-column width="55" prop="zx_rate" label="完成率(%)"></el-table-column>
      </el-table-column>
      <el-table-column label="后督察" align="center">
        <el-table-column width="50" prop="hdc_times" label="下达次数"></el-table-column>
        <el-table-column width="50" prop="hdc_finish" label="完成次数"></el-table-column>
        <el-table-column width="55" prop="hdc_rate" label="完成率(%)"></el-table-column>
      </el-table-column>
      <el-table-column label="临时任务" align="center">
        <el-table-column width="50" prop="ls_times" label="下达次数"></el-table-column>
        <el-table-column width="50" prop="ls_finish" label="完成次数"></el-table-column>
        <el-table-column width="55" prop="ls_rate" label="完成率(%)"></el-table-column>
      </el-table-column>
      <el-table-column label="问题线索任务" align="center">
        <el-table-column width="50" prop="wt_times" label="下达次数"></el-table-column>
        <el-table-column width="50" prop="wt_finish" label="完成次数"></el-table-column>
        <el-table-column width="55" prop="wt_rate" label="完成率(%)"></el-table-column>
      </el-table-column>
      <el-table-column label="案件取证任务" align="center">
        <el-table-column width="50" prop="aj_times" label="下达次数"></el-table-column>
        <el-table-column width="50" prop="aj_finish" label="完成次数"></el-table-column>
        <el-table-column width="55" prop="aj_rate" label="完成率(%)"></el-table-column>
      </el-table-column>
      <el-table-column label="其他" align="center">
        <el-table-column width="50" prop="else_times" label="下达次数"></el-table-column>
        <el-table-column width="50" prop="else_finish" label="完成次数"></el-table-column>
        <el-table-column width="55" prop="else_rate" label="完成率(%)"></el-table-column>
      </el-table-column>
    </el-table> -->
    <el-card v-for="(v, i) in tableData" :key="i">
      <div slot="header" class="clearfix">
        <span>{{v.title}}</span>
      </div>
      <vChart :options="v.config" class="chart" auto-resize/>
    </el-card>
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
      tableData: [
        // { district: '中原区', all_times: 500, all_finish: 30, all_rate: '20', ssj_times: 500, ssj_finish: 30, ssj_rate: '20', zx_times: 500, zx_finish: 30, zx_rate: '20', hdc_times: 500, hdc_finish: 30, hdc_rate: '20', ls_times: 500, ls_finish: 30, ls_rate: '20', wt_times: 500, wt_finish: 30, wt_rate: '20', aj_times: 500, aj_finish: 30, aj_rate: '20', else_times: 500, else_finish: 30, else_rate: '20'},
        // { district: '中原区', all_times: 500, all_finish: 30, all_rate: '20', ssj_times: 500, ssj_finish: 30, ssj_rate: '20', zx_times: 500, zx_finish: 30, zx_rate: '20', hdc_times: 500, hdc_finish: 30, hdc_rate: '20', ls_times: 500, ls_finish: 30, ls_rate: '20', wt_times: 500, wt_finish: 30, wt_rate: '20', aj_times: 500, aj_finish: 30, aj_rate: '20', else_times: 500, else_finish: 30, else_rate: '20'},
        // { district: '中原区', all_times: 500, all_finish: 30, all_rate: '20', ssj_times: 500, ssj_finish: 30, ssj_rate: '20', zx_times: 500, zx_finish: 30, zx_rate: '20', hdc_times: 500, hdc_finish: 30, hdc_rate: '20', ls_times: 500, ls_finish: 30, ls_rate: '20', wt_times: 500, wt_finish: 30, wt_rate: '20', aj_times: 500, aj_finish: 30, aj_rate: '20', else_times: 500, else_finish: 30, else_rate: '20'},
        // { district: '中原区', all_times: 500, all_finish: 30, all_rate: '20', ssj_times: 500, ssj_finish: 30, ssj_rate: '20', zx_times: 500, zx_finish: 30, zx_rate: '20', hdc_times: 500, hdc_finish: 30, hdc_rate: '20', ls_times: 500, ls_finish: 30, ls_rate: '20', wt_times: 500, wt_finish: 30, wt_rate: '20', aj_times: 500, aj_finish: 30, aj_rate: '20', else_times: 500, else_finish: 30, else_rate: '20'},
        // { district: '中原区', all_times: 500, all_finish: 30, all_rate: '20', ssj_times: 500, ssj_finish: 30, ssj_rate: '20', zx_times: 500, zx_finish: 30, zx_rate: '20', hdc_times: 500, hdc_finish: 30, hdc_rate: '20', ls_times: 500, ls_finish: 30, ls_rate: '20', wt_times: 500, wt_finish: 30, wt_rate: '20', aj_times: 500, aj_finish: 30, aj_rate: '20', else_times: 500, else_finish: 30, else_rate: '20'}
      ],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let startTime = (this.formInline.finishTime && this.formInline.finishTime.length) ? formatDateToStr(this.formInline.finishTime[0]) : '';
      let endTime = (this.formInline.finishTime && this.formInline.finishTime.length) ? formatDateToStr(this.formInline.finishTime[1]) : '';
      this.$ajax(url.workDonePC, {
        startTime,
        endTime
      }).then(res => {
        if(res.success) {
          let config = {
            color: ['#5094FF', '#64DAAC', '#FAC84A'],
            grid: {
              top: '15%',
              bottom: '20%',
              right: '5%',
              left: '5%'
            },
            tooltip: {},
            legend: {
              data: ['下达次数', '完成次数', '完成率'],
              top: '0'
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                rotate: 20
              },
              data: ['04-13', '04-14', '04-15', '04-16', '04-17', '04-18', '04-19']
            },
            yAxis: [{
              name: '单位(次)',
              nameLocation: 'end',
              type: 'value',
              // nameTextStyle: {
              //   fontSize: '0.072917rem',
              //   color: '#999999'
              // }
            }, {
              name: '完成率(%)',
              nameLocation: 'end',
              type: 'value',
              min: 0,
              max: 100,
              // interval: 10
            }],
            series: [
              {
                name: '下达次数',
                type: 'bar',
                barGap: '5%',
                barWidth: '20%',
                data: [20, 232, 441, 654, 770, 530, 410]
              },
              {
                name: '完成次数',
                type: 'bar',
                barGap: '5%',
                barWidth: '20%',
                data: [120, 482, 791, 834, 590, 930, 710]
              },
              {
                name: '完成率',
                type: 'line',
                yAxisIndex: 1,
                data: [420, 332, 291, 654, 590, 330, 810]
              }
            ]
          }
          let arr = res.data.map(v => {
            config.xAxis.data = v.xaxis;
            config.series[0].data = v.count;
            config.series[1].data = v.doneCount;
            config.series[2].data = v.ratio;
            return {
              title: v.type,
              config: config
            }
          })
          this.tableData = arr;
        }
      })
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
    height: 100%;
    overflow-y: auto;
    .el-card{
      margin-bottom: 20px;
    }
    .chart {
      width: 100%;
    }
  }
</style>
