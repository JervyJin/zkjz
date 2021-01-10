<template>
  <div class="page">

    <el-row :gutter="10">
      <el-col :span="6">
        <div class="point first">
          <div class="key">本月任务概况</div>
          <div class="val">
            <span>已完成：</span>
            <span>{{points.month.done}}件</span>
            <span>待完成：</span>
            <span>{{points.month.todo}}件</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="point second">
          <div class="key">年度任务概况</div>
          <div class="val">
            <span>任务总量：</span>
            <span>{{points.year.count}}件</span>
            <span>完成率：</span>
            <span>{{points.year.ratio}}%</span>
          </div>
        </div>
      </el-col>
      <!--<el-col :span="6">
        <div class="point third">
          <div class="key">本月黑名单概况</div>
          <div class="val">
            <span>数量：</span>
            <span>36</span>
            &lt;!&ndash;<span>待完成：</span>
            <span>{{points.month.todo}}件</span>&ndash;&gt;
          </div>
        </div>
      </el-col>-->
      <!-- <el-col :span="6">
        <div class="point third">
          <div class="key">本月任务概况</div>
          <div class="val">
            <span>已完成：</span>
            <span>{{points.month.done}}件</span>
            <span>待完成：</span>
            <span>{{points.month.todo}}件</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="point fourth">
          <div class="key">年度任务概况</div>
          <div class="val">
            <span>任务总量：</span>
            <span>{{points.year.count}}件</span>
            <span>完成率：</span>
            <span>{{points.year.ratio}}%</span>
          </div>
        </div>
      </el-col> -->
    </el-row>

    <el-row :gutter="10" class="items">
      <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <el-card class="item1">
          <div class="top" >待办事项<span @click="toTask"><span style="cursor: pointer;">更多>></span></span></div>
          <div class="listBox">
            <div class="list" v-for="v in task" :key="v.id">
              <!-- <span class="name"><i class="el-icon-time"></i>{{v.taskname}}</span> -->
              <el-tooltip class="name" effect="dark" :content="v.taskName" placement="top">
                <span><i class="el-icon-time"></i>{{v.taskName}}</span>
              </el-tooltip>
              <span>{{v.created | formatDate}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <el-card class="item2">
          <div class="top">办结率
            <!--<el-date-picker
              style="width: 65%"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="query.checkTime"
            >
            </el-date-picker>-->
          </div>
          <vChart class="chart" :options="pieOptions" auto-resize />
        </el-card>
      </el-col>
      <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <el-card class="item2">
          <div class="top">任务类型
            <!--<el-date-picker
              style="width: 65%"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="query.checkTime"
            >
            </el-date-picker>-->
          </div>
          <vChart class="chart bar" :options="piesOptions" auto-resize />
        </el-card>
      </el-col>
      <el-col :span="24" >
        <el-card class="item2" style="margin-top: 24px;">
          <div class="top">执法人员统计
            <!--<el-date-picker
              style="width: 45%"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="query.checkTime"
            >
            </el-date-picker>-->
          </div>
          <vChart class="chart" :options="barOptions" auto-resize />
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="bars">
        <el-card class="item2">
          <div class="top">执法任务统计
            <!--<el-date-picker
              style="width: 45%"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="query.checkTime"
            >
            </el-date-picker>-->
          </div>
          <vChart class="chart1" :options="barOptions1" auto-resize />
        </el-card>
      </el-col>
      <el-col :span="24" class="bars">
        <el-card class="item2">
          <div class="top">双随机任务统计
            <!--<el-date-picker
              style="width: 45%"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="query.checkTime"
            >
            </el-date-picker>-->
          </div>
          <vChart class="chart1" :options="barOptions2" auto-resize />
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
export default {
  data() {
    return {
      points: {
        month: {},
        year: {}
      },
      task: [],
      finishRatio: [],
      taskTypeRatio: [],
      query: {
        checkTime: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 30), new Date()]
      },
      pieOptions: {
        color: ['#5094FF', '#E96E5D', '#E9978C', '#51ABFF', '#F6C02B'],
        title: {
          text: '办结率',
          left: 'center',
          top: '35%',
          textStyle: {
            fontSize: '0.072917rem',
            color: '#333333',
            fontStyle: 'normal'
          }
        },
        // legend: {
        //   data: ['点位垂直式', '点位水平式', '点位移动式'],
        //   bottom: 0
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '办结率',
            type: 'pie',
            radius: ['40%','75%'],
            center: ['50%', '38%'],
            data: [
              // {value: 54, name: '点位垂直式'},
              // {value: 12, name: '点位水平式'},
              // {value: 32, name: '点位移动式'}
            ],
            label: {
              position: 'inside',
              formatter: '{c}'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      piesOptions: {
        color: ['#5094FF', '#E96E5D', '#E9978C', '#51ABFF', '#F6C02B'],
        title: {
          // text: '汽油柴油分布',
          // top: '5%',
          // left: '5%',
          // textStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#333333',
          //   fontStyle: 'normal'
          // }
        },
        // grid: {
        //   top: '0',
        //   bottom: '0',
        //   right: '5%',
        //   left: '5%'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '任务类型',
            type: 'pie',
            radius: '75%',
            center: ['50%', '38%'],
            data: [
              // {value: 50, name: 'NOx超标'},
              // {value: 30, name: 'PM2.5超标'},
              // {value: 20, name: '超标污染物'},
            ],
            label: {
              position: 'inside',
              // formatter: '{b} \n {c}({d}%)'
              formatter: '{d}%'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      barOptions: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        grid: {
          top: '15%',
          bottom: '20%',
          right: '15%',
          left: '15%'
        },
        tooltip: {},
        // legend: {
        //   data: ['合格数', '超标数', '合格率', '超标率'],
        //   top: '0'
        // },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 15
          },
          data: []
        },
        yAxis: {
          name: '单位(人)',
          nameLocation: 'end',
          type: 'value',
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: '人员数',
            type: 'bar',
            barWidth: '15%',
            barGap: '5%',
            data: [20, 232, 441, 654, 770, 530, 410]
          }
        ]
      },
      barOptions1: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        grid: {
          top: '15%',
          bottom: '30%',
          right: '15%',
          left: '15%'
        },
        tooltip: {},
        // legend: {
        //   data: ['合格数', '超标数', '合格率', '超标率'],
        //   top: '0'
        // },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 15
          },
          data: []
        },
        yAxis: {
          name: '单位(个)',
          nameLocation: 'end',
          type: 'value',
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: '任务量',
            type: 'bar',
            barWidth: '15%',
            barGap: '5%',
            data: [20, 232, 441, 654, 770, 530, 410]
          }
        ]
      },
      barOptions2: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        grid: {
          top: '15%',
          bottom: '30%',
          right: '15%',
          left: '15%'
        },
        tooltip: {},
        // legend: {
        //   data: ['合格数', '超标数', '合格率', '超标率'],
        //   top: '0'
        // },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 15
          },
          data: []
        },
        yAxis: {
          name: '单位(个)',
          nameLocation: 'end',
          type: 'value',
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: '任务量',
            type: 'bar',
            barWidth: '15%',
            barGap: '5%',
            data: [20, 232, 441, 654, 770, 530, 410]
          }
        ]
      },

    }
  },
  filters: {
    formatDate(v) {
      return formatDateToStr(new Date(v)).split(' ')[0]
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let query = {
        startTime: formatDateToStr(this.query.checkTime[0]),
        endTime: formatDateToStr(this.query.checkTime[1])
      }
      this.$ajax(url.thisMonthTask, {}).then(res => {
        this.points.month = res.data;
      });
      this.$ajax(url.thisYearTask, {}).then(res => {
        this.points.year = res.data;
      });
      this.$ajax(url.getTaskList, {dbType: 0, pageIndex: 1, pageSize: 5}).then(res => {
        this.task = res.data.list;
      });
      this.$ajax(url.finishRatio, query).then(res => {
        this.pieOptions.series[0].data = res.data;
        this.pieOptions.legend = {
          bottom: '10%',
          data: res.data.map(v => v.name)
        }
        this.pieOptions.title.text = '办结率';
        // this.finishRatio = res.data;
      });
      this.$ajax(url.taskTypeRatio, query).then(res => {  // 任务类型
        // this.taskTypeRatio = res.data;
        this.piesOptions.series[0].data = res.data;
        this.piesOptions.legend = {
          bottom: '10%',
          data: res.data.map(v => v.name)
        }
      })
      this.$ajax(url.legalUser, query).then(res => {  // 人员
        // this.taskTypeRatio = res.data;
        this.barOptions.xAxis.data = res.data.xaxis;
        this.barOptions.series[0].data = res.data.count;
        this.barOptions.legend = {
          bottom: 0,
          data: res.data.xaxis
        }
      })
      this.$ajax(url.taskByArea, query).then(res => {  // 任务
        // this.taskTypeRatio = res.data;
        this.barOptions1.xAxis.data = res.data.xaxis;
        this.barOptions1.series[0].data = res.data.count;
        this.barOptions1.legend = {
          bottom: 0,
          data: res.data.xaxis
        }
      })
      this.$ajax(url.douRandom, query).then(res => {  // 双随机
        // this.taskTypeRatio = res.data;
        this.barOptions2.xAxis.data = res.data.xaxis;
        this.barOptions2.series[0].data = res.data.count;
        this.barOptions2.legend = {
          bottom: 0,
          data: res.data.xaxis
        }
      })
    },
    // 查看更多
    toTask() {
      this.$router.push('/zfxt/dbrw');
    }
  }
};
</script>

<style lang="less" scoped>
  .page{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 60px;
    .point{
      color: #fff;
      // width: 24%;
      // width: 392px;
      height: 120px;
      border-radius: 6px;
      padding: 16px 24px;
      box-sizing: border-box;
      &.first{
        background-image: linear-gradient(135deg, #1890FF 0%, #51ABFF 100%);
      }
      &.second{
        background-image: linear-gradient(-45deg, #FFB27B 0%, #FA964E 100%);
      }
      &.third{
        background-image: linear-gradient(135deg, #1890FF 0%, #51ABFF 100%);
      }
      &.fourth{
        background-image: linear-gradient(161deg, #9170F5 0%, #B593FF 100%);
      }
      .key{
        line-height: 22px;
        font-size: 16px;
        text-align: left;
      }
      .val{
        font-size: 14px;
        margin-top: 24px;
        line-height: 20px;
        span:nth-of-type(2) {
          margin-right: 32px;
        }
      }
    }

    .items{
      margin-top: 24px;

      /deep/ .el-card__body{
        padding: 20px 30px 0;
        height: 430px;
        box-sizing: border-box;
      }
    }
    .bars{
      margin-top: 24px;

      /deep/ .el-card__body{
        padding: 20px 30px 0;
        height: 354px;
        box-sizing: border-box;
      }

      .top{
        font-size: 14px;
        color: #4C4C4C;
        height: 38px;
        border-bottom: 1px solid #EBEBEB;
        span{
          float: right;
          font-size: 14px;
          color: #666666;
        }
      }

      .chart1{
        width: 100%;
        height: 294px;
      }
    }

    // 待办事项
    .item1{
      .top{
        font-size: 14px;
        color: #4C4C4C;
        height: 38px;
        border-bottom: 1px solid #EBEBEB;
        span{
          float: right;
        }
      }
      .listBox {
        width: 100%;
        height: calc(100% - 58px);
        overflow-y: auto;
        padding-right: 6px;
      }
      .list{
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        color: #666666;
        border-bottom: 1px dashed #EBEBEB;
        display: flex;
        justify-content: space-between;
        color: #666666;
        font-weight: 200;
        .name {
          // 文字不换行，超出字数用...
          width: 128px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        // cursor: pointer;
        .el-icon-time{
          color: #1890FF;
          margin-right: 5px;
        }
        .name:hover{
          color: #333333;
          font-weight: 600;
        }
        .name:active{
          // color: #1890FF;
        }
        &:last-of-type{
          border: none;
        }
      }
    }
    .chart{
      width: 100%;
      height: 371px;
    }
    .item2{
      .top{

        font-size: 14px;
        color: #4C4C4C;
        height: 38px;
        border-bottom: 1px solid #EBEBEB;
        position: relative;
        .el-date-editor.el-input__inner {
          position: absolute;
          right: 0;
          top: -5px;
        }
      }
    }

  }
</style>
