<template>
  <div class="page">

    <el-row class="points" type="flex" justify="space-between">
      <el-col :span="4" :class="['point', i == 0 ? 'first' : i == 1 ? 'second' : i == 2 ? 'third': 'fourth']" v-for="(v, i) in points" :key="i">
        <div class="key">{{v.key}}</div>
        <template v-if="i<2">
          <vChart class="chart" :options="v.pieOptions" auto-resize />
        </template>
        <template v-else-if="i==2">
          <div class="rate">
            <div class="online"><span>在线率</span><i :class="i < 7 ? 'rate1' : ''" v-for="i in 10" :key="i"></i>{{v.val}}个<span></span></div>
            <div class="offline"><span>不在线率</span><i :class="i < 5 ? 'rate1' : ''" v-for="i in 10" :key="i"></i>{{100 - v.val}}个<span></span></div>
          </div>
        </template>
        <div class="val" v-else>{{v.val}}<span>条</span></div>
      </el-col>
    </el-row> 

    <div class="title">审验车辆数据统计</div>
    <el-card>
      <el-form :inline="true" :model="searchQuery">
        <el-form-item label="日期">
          <el-date-picker
           
            v-model="searchQuery.date"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <vChart class="chart3" :options="barOptions" auto-resize />
    </el-card>
    
    <el-row class="card1" :gutter="15">
      <el-col :span="12">
        <el-card>
          <div class="title">超标车辆--生产企业（TOP5）</div>
          <vChart class="chart3" :options="bar2Options" auto-resize />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="title">超标车辆--生产企业（TOP5）</div>
          <vChart class="chart3" :options="bar2Options" auto-resize />
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      points: [
        {key: '黑烟占比', pieOptions: {
          color: ['#fff', '#ccc'],
          title: {
            text: '25%',
            left: '50%',
            top: 'center',
            textStyle: {
              fontSize: '0.072917rem',
              color: '#fff',
              fontStyle: 'normal'
            }
          },
          series: [
            {
              name: '气体值',
              type: 'pie',
              radius: ['60%','80%'],
              center: ['60%', '50%'],
              data: [
                {value: 75, name: '点位水平式'},
                {value: 25, name: '点位垂直式'}
              ],
              label: {
                show: false,
                position: 'inside',
                formatter: '{c}'
              }
            }
          ]
        }},
        {key: 'NO超标占比', pieOptions: {
          color: ['#fff', '#ccc'],
          title: {
            text: '25%',
            left: '50%',
            top: 'center',
            textStyle: {
              fontSize: '0.072917rem',
              color: '#fff',
              fontStyle: 'normal'
            }
          },
          series: [
            {
              name: '气体值',
              type: 'pie',
              radius: ['60%','80%'],
              center: ['60%', '50%'],
              data: [
                {value: 75, name: '点位水平式'},
                {value: 25, name: '点位垂直式'}
              ],
              label: {
                show: false,
                position: 'inside',
                formatter: '{c}'
              }
            }
          ]
        }},
        {key: '今日设备上线情况', val: 60},
        {key: '治理数量', val: 53354},
        {key: '合格数据', val: 50145},
        {key: '超标数据', val: 3025}
      ],
      
      bar2Options: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        grid: {
          top: '5%',
          bottom: '20%',
          right: '5%',
          left: '10%'
        },
        tooltip: {},
        legend: {
          data: ['点位垂直式', '点位水平式', '点位移动式'],
          bottom: '5%'
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: ['中原', '金水', '二七', '管城', '东区', '新密', '荥阳']
        },
        series: [
            {
                name: '邮件营销',
                type: 'bar',
                barWidth: '20%',
                stack: '总量',
                data: [120, 432, 641, 854, 970, 830, 810]
            }
        ]
      },
      barOptions: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        grid: {
          top: '15%',
          bottom: '20%',
          right: '5%',
          left: '5%'
        },
        tooltip: {},
        legend: {
          data: ['合格数', '超标数', '合格率', '超标率'],
          top: '0'
        },
        xAxis: {
          type: 'category',
          data: ['04-13', '04-14', '04-15', '04-16', '04-17', '04-18', '04-19']
        },
        yAxis: {
          // name: '合格率(%)',
          // nameLocation: 'middle',
          type: 'value',
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
            {
                name: '合格数',
                type: 'bar',
                barWidth: '20%',
                data: [20, 232, 441, 654, 770, 530, 410]
            },
            {
                name: '超标数',
                type: 'line',
                data: [120, 482, 791, 834, 590, 930, 710]
            },
            {
                name: '合格率',
                type: 'line',
                data: [420, 332, 291, 654, 590, 330, 810]
            },
            {
                name: '超标率',
                type: 'line',
                data: [120, 232, 391, 854, 590, 730, 410]
            }
        ]
      },
      
      searchQuery: {
        district: [],
        date: ''
      },
      districts: [
        {
          label: '东区',
          value: '410000'
        }
      ]
    }
  }
};
</script>

<style lang="less" scoped>
  .page{
    padding-bottom: 60px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .title{
      color: #333333;
      font-weight: 700;
      line-height: 20px;
      margin: 20px 0;
    }
    .points{
      margin-top: 15px;
      .point{
        color: #fff;
        width: 16%;
        // margin-right: 15px;
        // width: 392px;
        height: 120px;
        border-radius: 6px;
        padding: 10px 14px;
        position: relative;
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
          font-size: 28px;
          text-align: center;
          margin-top: 16px;
          span{
            font-size: 16px;
          }
        }
        .chart{
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
        }
        .rate{
          margin-top: 16px;
          font-size: 12px;
          color: #FFFFFF;
          text-align: left;
          span{
            display: inline-block;
            vertical-align: middle;
          }
          i{
            display: inline-block;
            width: 7px;
            height: 12px;
            background: #ccc;
            vertical-align: middle;
            margin-right: 4px;
            &:last-of-type{
              margin-right: 5px;
            }
            &.rate1{
              background: #fff;
            }
          }
          .online{
            margin-bottom: 7px;
            span:first-of-type{
              width: 53px;
              margin-right: 9px;
            }
          }
          .offline{
            span:first-of-type{
              width: 53px;
              margin-right: 9px;
            }
          }
        }
      }
    }
    .charts{
      width: 100%;
      margin-top: 16px;
      .charts1{
        width: 66%;
      }
      .charts2{
        width: 32%;
      }
      .chart{
        width: 100%;
        height: 370px;
      }
    }

    .chart3{
      width: 100%;
      height: 237px;
    }

    .chart4{
      width: 100%;
      height: 259px;
      .chart4_1{
        width: 100%;
        height: 100%;
      }
    }
    .card1{
      margin: 20px;
    }
  }
</style>