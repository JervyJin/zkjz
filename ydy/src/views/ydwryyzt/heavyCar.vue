<template>
  <div class="page">
    <el-form :inline="true" :model="query">
      <!--<el-form-item label="日期类型：">
        <el-select v-model="query.area">
          <el-option :label="'全部'" :value="0"></el-option>
          <el-option :label="'年报'" :value="1"></el-option>
          <el-option :label="'月报'" :value="2"></el-option>
          <el-option :label="'日报'" :value="3"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="日期：">
        <el-date-picker
          v-model="query.date"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row class="points" :gutter="15">
      <el-col :span="4" v-for="(v, i) in points" :key="i">
        <div :class="['point', i == 0 ? 'first' : i == 1 ? 'second' : i == 2 ? 'third': i == 3 ? 'fourth': 'first']">
          <div class="key">{{v.key}}</div>
          <div class="val">{{v.val}}<span></span></div>
          <template v-if="i==0">
            <vChart class="chart" :options="v.pieOptions" auto-resize />
          </template>
        </div>
      </el-col>
      <!--<el-col :span="4">
        <div class="point first">
          <div class="key">统计出NO占比</div>
          <div class="val">1%</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="point second">
          <div class="key">今日上线设备数</div>
          <div class="val">4965</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="point third">
          <div class="key">治理数量</div>
          <div class="val">364</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="point fourth">
          <div class="key">超标数量</div>
          <div class="val">749</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="point first">
          <div class="key">超标率数据</div>
          <div class="val">12%</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="point second">
          <div class="key">合格数量</div>
          <div class="val">4762</div>
        </div>
      </el-col>-->
    </el-row>
    <!-- 地图 -->
    <!--<div class="amap-box">
      <sMap :MapPoint="MapPoint"/>
    </div>-->

    <el-row :gutter="10">
      <!-- 检测人员分布 -->
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>公司分类统计</span>
          </div>
          <div class="tableWrap">
            <el-table
              :data="tableData1"
              border
              stripe
            >
              <el-table-column prop="gys" label="公司名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="clzs" label="车辆总数">
                <!--<template slot-scope="scope">
                  <span>{{scope.row.yellow | dataShow}}</span>
                </template>-->
              </el-table-column>
              <el-table-column prop="gzclzs" label="过载车辆总数">
                <!--<template slot-scope="scope">
                  <span>{{scope.row.orange | dataShow}}</span>
                </template>-->
              </el-table-column>
              <el-table-column prop="sjcszs" label="数据传输总数"></el-table-column>
            </el-table>
          </div>
          <!--<vChart class="chart3" :options="barOptions_status" auto-resize />-->
        </el-card>
      </el-col>
      <!-- 检测机构分布 -->
      <!--<el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>过载情况统计</span>
          </div>
          <vChart class="chart3" :options="barOptions_status2" auto-resize />
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>数据传输情况统计</span>
          </div>
          <vChart class="chart3" :options="barOptions_status3" auto-resize />
        </el-card>
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';
import sMap from  './heavyCar-map'
export default {
  components: {
    sMap
  },
  data () {
    return {
      // MapPoint:[],
      points: [
        {key: '柴油车改造(双降)', val: 0},
        {key: '违规车次', val: 0},
        {key: '全市国三保有量', val: 0},
        {key: '前NOx超标车次', val: 0},
        {key: '后NOx超标车次', val: 0},
        // {key: '超标数据', val: 0}
      ],
      query: {
        date: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)]
      },
      tableData1: [],
      // 车辆情况统计
      barOptions_status: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          // top: "10%",
          bottom: "22%",
          // right: "5%",
          // left: "5%"
        },
        tooltip: {},
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 20
          },
          data: ['中原路', '秦岭路', '桐柏路','中原路', '秦岭路', '中原路', '秦岭路', '中原路', '秦岭路', '中原路', '秦岭路', ]
        },
        yAxis: {
          name: '单位(辆)',
          nameLocation: 'end',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: '车辆数',
            type: 'bar',
            barWidth:"40%",
            data: [100, 200, 300, 500],
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
      // 过载情况统计
      barOptions_status2: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          // top: "10%",
          bottom: "22%",
          // right: "5%",
          // left: "5%"
        },
        tooltip: {},
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 20
          },
          data: ['中原路', '秦岭路', '桐柏路','中原路', '秦岭路', '中原路', '秦岭路', '中原路', '秦岭路', '中原路', '秦岭路', ]
        },
        yAxis: {
          name: '单位(辆)',
          nameLocation: 'end',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: '车辆数',
            type: 'bar',
            barWidth:"40%",
            data: [100, 200, 300, 500],
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
      // 数据传输统计
      barOptions_status3: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          // top: "10%",
          bottom: "22%",
          // right: "5%",
          // left: "5%"
        },
        tooltip: {},
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 20
          },
          data: ['中原路', '秦岭路', '桐柏路','中原路', '秦岭路', '中原路', '秦岭路', '中原路', '秦岭路', '中原路', '秦岭路', ]
        },
        yAxis: {
          name: '单位(辆)',
          nameLocation: 'end',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: '车辆数',
            type: 'bar',
            barWidth:"40%",
            data: [100, 200, 300, 500],
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
      searchQuery: {
        district: [],
        date: []
      },
    }
  },
  created() {
    this.getData();
  },
  methods: {
    search() {
      this.getChart();

    },
    getData() {
      let query = {
        dateStart: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        dateEnd: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : ''
      }
      // 数量
      this.$ajax(url.getSltj, query).then(res => {
        if (res.success) {
          this.points[0].val = res.data.cycgzsl;
          this.points[1].val = res.data.wgsl;
          this.points[2].val = res.data.gssl;
          this.points[3].val = res.data.qNOcbsl;
          this.points[4].val = res.data.hNOcbsl;
          // this.points[3].val = res.data.jczsl;
          // this.points[3].val = res.data.exceedNum.count;

          // this.points[0].pieOptions.series[0].data = [
          //   {value: res.data.equipmentRatio.Y, name: '是'},
          //   {value: res.data.equipmentRatio.N, name: '否'}
          // ];
        }
      });
      this.getChart();
      // this.getMapPoint();
    },
    // 排放标准统计
    getChart() {
      let query = {
        dateStart: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        dateEnd: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : ''
      }
      this.$ajax(url.companyInfoTj, query).then(res => {
        if (res.success) {
          this.tableData1 = res.data;
          /*this.barOptions_status.xAxis.data = res.data.map(v => v.gys);
          this.barOptions_status.series[0].data = res.data.map(v => v.zs);*/
          // this.barOptions_status.series[1].data = res.data.map(v => v.bhgs);
          // this.barOptions_status.series[2].data = res.data.map(v => v.wjcs);
        }
      });
      /*this.$ajax(url.getGztj, query).then(res => {
        if (res.success) {
          this.barOptions_status2.xAxis.data = res.data.map(v => v.gys);
          this.barOptions_status2.series[0].data = res.data.map(v => v.zs);
        }
      });
      this.$ajax(url.getSjcstj, query).then(res => {
        if (res.success) {
          this.barOptions_status3.xAxis.data = res.data.map(v => v.gys);
          this.barOptions_status3.series[0].data = res.data.map(v => v.zs);
        }
      });*/
    },
  }
};
</script>

<style lang="less" scoped>
  .page{
    padding-bottom: 60px;
    // height: calc(100% - 100px);
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .amap-box{
      height: 320px;
      width: 100%;
      margin-top: 20px;
    }
    .title{
      color: #333333;
      font-weight: 700;
      line-height: 20px;
      margin: 20px 0;
    }
    .points{
      .point{
        color: #fff;
        // width: 16%;
        // margin-right: 15px;
        // width: 392px;
        height: 120px;
        margin-bottom: 30px;
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
      height: 368px;
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
  .box{
    height: 300px;
    margin-top: 20px;
    // background: #ccc;
  }
  .el-card {
    /*margin-top: 20px;*/
  }
  .tableWrap {
    /*height: calc(100vh - 400px);*/
  }
</style>
