<template>
  <div class="page">
    <map-a :startAndEndDate="startAndEndDate" :remoteTableData="remoteTableData" :selectRow="selectRow" ref="mapA"/>
    <div class="pie-graph" v-show="isShowChart">
      <div class="charts">
        <vChart class="chart" :options="pieOptions" auto-resize />
      </div>
    </div>
    <div class="line-graph" v-show="isShowChart">
      <div class="charts">
        <!-- <vChart class="chart" :options="lineOptions" /> -->
      </div>
    </div>
    <div class="right">
      <div class="right-time">
        <el-date-picker
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="startAndEndDate"
        ></el-date-picker>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </div>
      <div class="title">地点分布</div>
      <div class="tableWrap">
        <el-table class="table" :data="remoteTableData" border show-summary stripe height="100%" @row-click="selectRowHandle">
          <el-table-column prop="jzmc" show-overflow-tooltip label="点位名称"></el-table-column>
          <el-table-column prop="zs" label="车辆数" width="55"></el-table-column>
          <el-table-column prop="qyczs" label="汽油车" width="55"></el-table-column>
          <el-table-column prop="cyczs" label="柴油车" width="55"></el-table-column>
          <!--<el-table-column prop="hgl" label="合格率" width="55"></el-table-column>-->
          <el-table-column prop="zcbs" label="超标车次" width="55"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="pagePram.total"
        background
        layout="total, prev, pager, next"
        :current-page="pagePram.currentPage"
        :page-size="pagePram.pageSize"
        :total="pagePram.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"

      ></el-pagination>
    </div>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';

import mapA from './component/mapA'

export default {
  components:{
    mapA
  },
  data() {
    return {
      pointObject: {
        pointName: '',
        dwbh: '',
        dwlx: '',
        dwzt: '',
        qyzz: '',
        longitude: '',
        latitude: ''
      },
      pointName: '',
      remoteTableData: [],
      selectRow: {},
      pieOptions: {
        grid: {
        },
        color: ["#7FB8FF", "#60A8FF", "#8FACFF", "#7197FF", "#60A8FF", "#9CC8FF",
          "#8FACFF", "#ACC1FF", "#49ACFF", "#68BAFF"],
        title: {
          text: "点位总气体值",
          left: "left",
          textStyle: {
            fontSize: "0.072917rem",
            color: "#333333",
            fontStyle: "normal",
            fontWeight: 700,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "气体值",
            type: "pie",
            radius: "80%",
            center: ["50%", "55%"],
            data: [],
            // label: {
            //   normal:{
            //     position: 'inside',
            //   formatter: '{b} \n {c}({d}%)',
            //     show : false
            //   }
            // },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      barOptions: {
        grid: {
          top: "20%",
          bottom: "15%",
          right: "2%",
        },
        title: {
          text: "合格率趋势",
          left: "left",
          textStyle: {
            fontSize: "0.072917rem",
            color: "#333333",
            fontStyle: "normal",
          },
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: [
            "中原",
            "金水",
            "二七",
            "管城",
            "东区",
            "新密",
            "荥阳",
            "巩义",
            "新郑",
            "上街",
            "惠济",
          ],
        },
        yAxis: {
          name: "合格率(%)",
          nameLocation: "middle",
          type: "category",
          nameTextStyle: {
            fontSize: "0.072917rem",
            color: "#999999",
          },
        },
        series: [
          {
            data: [68, 65, 64, 63, 62, 50, 49, 47, 45, 40, 35],
            type: "bar",
            barWidth: "40%",
            itemStyle: {
              color: "#1890FF",
            },
          },
        ],
      },
      startDate: "",
      startAndEndDate: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)],
      pagePram: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      isShowChart: false,
      isShowInfo: false,
      lineOptions: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        title: {
          text: "点位天气曲线图",
          left: "left",
          textStyle: {
            fontSize: "0.072917rem",
            color: "#333333",
            fontStyle: "normal",
            fontWeight: "bold",
          },
        },
        grid: {
          // top: '5%',
          // bottom: '20%',
          // right: '5%',
          // left: '10%'
          x: 50,
        },
        tooltip: {},
        legend: {
          data: ['温度', '湿度', '风速', '大气压'],
          bottom: "5%",
        },
        xAxis: {
          type: "category",
          data: ['00', '02', '04', '06', '08', '10', '12', '14'],
        },
        yAxis: {
          // name: '合格率(%)',
          // nameLocation: 'middle',
          type: "value",
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "温度",
            type: "line",
            stack: "总量",
            data: [140, 432, 641, 854, 970, 830, 810],
          },
          {
            name: "湿度",
            type: "line",
            stack: "总量",
            data: [130, 482, 791, 834, 590, 930, 710],
          },
          {
            name: "风速",
            type: "line",
            stack: "总量",
            data: [120, 232, 391, 854, 590, 730, 410],
          },{
            name: "大气压",
            type: "line",
            stack: "总量",
            data: [100, 300, 438, 800, 590, 678, 200],
          },

        ],
      },
    };
  },
  mounted() {
    // this.point();
    this.getRemoteData();
  },
  methods: {
    onSubmit() {
      this.pagePram.currentPage = 1;
      this.pagePram.pageSize = 10;
      this.getRemoteData();
      /*this.$refs.mapA.openCharts({
        dateStart: (this.startAndEndDate && this.startAndEndDate.length) ? formatDateToStr(this.startAndEndDate[0]).slice(0, 10) : '',
        dateEnd: (this.startAndEndDate && this.startAndEndDate.length) ? formatDateToStr(this.startAndEndDate[1]).slice(0, 10) : '',
      });*/
    },
    openCharts(id) {
      this.$ajax(url.totalByQiti, {id}).then(res => {
        const data = res.map((item) => {
          return {value: item.persent, name: item.name};
        });
        this.pieOptions.series[0].data = data;
      });
      this.isShowChart = true;
    },
    getRemoteData () {
      let queryParam = {
        dateStart: this.startAndEndDate ? formatDateToStr(this.startAndEndDate[0]).slice(0, 10) : '',
        dateEnd: this.startAndEndDate ? formatDateToStr(this.startAndEndDate[1]).slice(0, 10) : '',
        pageIndex: this.pagePram.currentPage,
        pageSize: this.pagePram.pageSize
      };
      this.$ajax(url.getClfb, queryParam).then(res => {
        if (res.success) {
          this.remoteTableData = res.data.list;
          this.pagePram.total = res.data.total;
          // this.point();
        }
      });

    },
    // 监听 页码值 改变事件
    handleCurrentChange (val) {
      this.pagePram.currentPage = val;
      this.getRemoteData()
    },
    // 监听 pagesize改变的事件
    handleSizeChange (size) {
      this.pagePram.pageSize = size;
      this.getRemoteData();
    },
    // 选中table某一行地图交互
    selectRowHandle(row) {
      this.selectRow = row;
    }
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  // height: 100%;
  display: flex;
  overflow-y: auto;
  .map {
    width: 74%;
    height: 100vh;
    position: relative;
    .pie-graph {
      width: 480px;
      height: 300px;
      /*width: 38%;
      height: 35%;*/
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 20px;
      bottom: 200px;
      background: #ffffff;
      z-index: 99;
      .charts {
        border-bottom: 1px solid #f6f6f6;
        width: 480px;
        .chart {
          width: 480px;
          height: 280px;
        }
      }
    }
    .line-graph {
      width: 480px;
      height: 300px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 20px;
      bottom: 200px;
      background: #ffffff;
      z-index: 99;
      .charts {
        border-bottom: 1px solid #f6f6f6;
        width: 480px;
        /*height: 300px;*/
        .chart {
          width: 480px;
          height: 280px;
        }
      }
    }
  }
  .el-pagination {
    /* float: right; */
     margin-top: 70px;
    // bottom: 10px;
    // right: 0;
    // position: absolute;
}
  .right {
    width: 26%;
    position: relative;
    right: 0;
    /*top: 0;*/
    font-size: 14px;
    border-left: 1px solid #f6f6f6;
    /deep/ .el-table__footer-wrapper{
      position: fixed;
    }
    .right-time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        /*margin-left: 10px;*/
        padding-left: 8px;
        padding-right: 8px;
      }
    }
    .tableWrap {
      height: calc(100vh - 330px);
      /*overflow: auto;*/
    }
    .title {
      font-weight: 700;
      background: #f6f6f6;
      height: 40px;
      line-height: 40px;
      color: #333333;
      padding-left: 15px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      tr:nth-of-type(2n) {
        background: #f6f6f6;
        border: 1px solid #f6f6f6;
      }
      td {
        text-align: center;
        height: 54px;
      }
    }
    .charts {
      /*border-bottom: 1px solid #F6F6F6;
      width: 100%;
      .chart{
        width: 100%;
        height: 284px;
        &.bar{
          height: 225px;
        }
      }*/
    }
  }
}
.point-info {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  .info-label {
    display: inline-block;
    width: 20%;
  }
}
</style>
