// M站系统
<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
        <div class="amap-box">
          <!--<div class="right-time">
            <el-date-picker
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="startAndEndDate"
            ></el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">查询</el-button>
          </div>-->
          <sMap :points="points" class="sMap"/>
        </div>
      </el-col>

      <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>机械类型统计</span>
          </div>
          <el-table
            :data="tableData"
            show-summary
            border
            stripe
            height="330"
          >
            <el-table-column prop="jxlx" label="机械类型"></el-table-column>
            <el-table-column prop="jxs" label="数量" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="in" label="入站"></el-table-column>
            <el-table-column prop="out" label="出站"></el-table-column> -->
          </el-table>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>排放阶段统计</span>
          </div>
          <el-table
            :data="tableData1"
            show-summary
            border
            stripe
            height="300"
          >
            <el-table-column prop="pfjd" label="阶段"></el-table-column>
            <el-table-column prop="jxs" label="数量" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="in" label="入站"></el-table-column>
            <el-table-column prop="out" label="出站"></el-table-column> -->
          </el-table>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>区域非道路机械统计</span>
          </div>
          <div class="time-search">
            <el-date-picker
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="startAndEndDate"
            ></el-date-picker>
            <el-button type="primary" @click="searchAreaCarTj">查询</el-button>
          </div>
          <el-table
            :data="tableData3"
            show-summary
            border
            stripe
            height="280"
          >
            <el-table-column prop="djqx" label="区域名称"></el-table-column>
            <el-table-column prop="jxzs" label="非道路机械总数"></el-table-column>
            <el-table-column prop="zxzs" label="在线总数"></el-table-column>
            <!-- <el-table-column prop="in" label="入站"></el-table-column>
            <el-table-column prop="out" label="出站"></el-table-column> -->
          </el-table>
        </el-card>
     </el-col>
     <!--<el-col :span="24">
      <el-card style="margin-top: 10px;">
        <div slot="header" class="clearfix">
          <span>区域机械检测情况</span>
        </div>
        <vChart class="chart3" :options="barOptions_status" auto-resize />
      </el-card>
     </el-col>-->
    </el-row>

  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';
import sMap from  './jxfx_map'
export default {
  data() {
    return {
      form: {
        depart: ''
      },
      startAndEndDate: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)],
      // Options: {
      //   color: ['#1890FF', '#64DAAC', '#FAC84A'],
      //   title: {
      //     text: "总计",
      //     left: "5%",
      //     top: "0%",
      //     textStyle: {
      //       fontSize: "0.072917rem",
      //       color: "#000",
      //       fontStyle: "normal"
      //     }
      //   },
      //   grid: {
      //     top: '15%',
      //     bottom: '15%',
      //     right: '5%',
      //     left: '5%'
      //   },
      //   tooltip: {},
      //   legend: {
      //     data: ['入', '出'],
      //     top: '0%',
      //     right: '5%'
      //   },
      //   xAxis: {
      //     type: 'category',
      //     data: ['8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7', '8.8']
      //   },
      //   yAxis: {
      //     // name: '车辆数',
      //     // nameLocation: 'end',
      //     type: 'value',
      //     // nameTextStyle: {
      //     //   fontSize: '0.072917rem',
      //     //   color: '#999999'
      //     // }
      //   },
      //   series: [
      //       {
      //           name: '入',
      //           type: 'line',
      //           areaStyle: {},
      //           data: []
      //       },
      //       {
      //           name: '出',
      //           type: 'line',
      //           areaStyle: {},
      //           data: []
      //       }
      //   ]
      // },

      barOptions_status: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "20%",
          bottom: "20%",
          right: "5%",
          left: "5%"
        },

        tooltip: {},
        legend: {
          data: ["合格", "不合格","未检测"],
          top: 0
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 15
          },
          data: ['中原路', '秦岭路', '桐柏路','中原路', '秦岭路', '中原路', '秦岭路', '中原路', '秦岭路', '中原路', '秦岭路', ]
        },
        yAxis: {
          // name: '合格率(%)',
          // nameLocation: 'middle',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "合格",
            type: "bar",
            // barWidth: "20%",
            data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          },
          {
            name: "不合格",
            type: "bar",
            data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          },
          {
            name: "未检测",
            type: "bar",
            data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          },

        ]
      },
      // piesOptions: {
      //   color: ['#5094FF', '#64DAAC', '#FAC84A'],
      //   xAxis: {
      //     type: 'category',
      //     data: ['工业钻探设备', '工程机械', '农业机械', '林业机械','材料装卸机械','雪梨装备']
      //   },
      //   yAxis: [{
      //     name: '车辆数',
      //     nameLocation: 'end',
      //     type: 'value',
      //     nameTextStyle: {
      //       fontSize: '0.072917rem',
      //       color: '#999999'
      //     },
      //     // min: 0,
      //     // max: 1000,
      //     // interval: 100
      //   }],
      //   legend: {
      //     data: ['车辆数'],
      //     top: '0'
      //   },
      //   grid: {
      //     top: '10%',
      //     bottom: '20%',
      //     right: '5%',
      //     left: '5%'
      //   },
      //   tooltip: {
      //     // trigger: 'item',
      //     // formatter: '{a} <br/>{b} : {c} ({d}%)'
      //   },
      //   series: [
      //     {
      //       name: '车辆数',
      //       type: 'bar',
      //       barWidth: '15%',
      //       data: [100, 200, 300, 500,600,450,],
      //       // emphasis: {
      //       //   itemStyle: {
      //       //     shadowBlur: 10,
      //       //     shadowOffsetX: 0,
      //       //     shadowColor: 'rgba(0, 0, 0, 0.5)'
      //       //   }
      //       // }
      //     }
      //   ]
      // },
      tableData: [],
      tableData1: [],
      tableData3: [],
      points: []
    }
  },

  components: {
    sMap
  },
  created() {
    this.getData();
    this.searchAreaCarTj();
  },
  methods: {
    point(arr) {
      const markers = [];
      const windows = [];
      const that = this;
      arr.forEach((item, index) => {
        /* 标记点 */
        markers.push({
          position: item.latlng,
          // icon:item.url, //不设置默认蓝色水滴
          events: {
            click() {
              // // 方法：鼠标移动到点标记上，显示相应窗体
              that.map.windows.forEach((window) => {
                window.visible = false; // 关闭窗体
              });
              that.map.window = that.map.windows[index];
              that.$nextTick(() => {
                that.map.window.visible = true;
              });
            },
          },
        });
        /* 窗体 */
        windows.push({
          position: item.latlng,
          isCustom: true,
          offset: [115, 55], // 窗体偏移
          showShadow: false,
          visible: false, // 初始是否显示
          item: item
        });
      });

      //  加点
      this.map.markers = markers;
      // 加弹窗
      this.map.windows = windows;
    },
    getData(v) {
      this.onQuery();  // 获取地图信息
      // 机械类型统计
      this.$ajax(url.getMachineType, {}).then(res => {
        if(res.success) {
          this.tableData = res.data || [];
        }
      });
      // 排放阶段统计
      this.$ajax(url.getPfbz, {}).then(res => {
        if(res.success) {
          this.tableData1 = res.data || [];

        }
      });

      // 区域机械检测情况
      /*this.$ajax(url.getAreaMachine, {}).then(res => {
        if(res.success) {
          this.barOptions_status.xAxis.data = res.data.map(v => v.djqx);
          this.barOptions_status.series[0].data = res.data.map(v => v.hgs);
          this.barOptions_status.series[1].data = res.data.map(v => v.bhgs);
          this.barOptions_status.series[2].data = res.data.map(v => v.wjcs);
        }
      });*/

    },
    searchAreaCarTj () {
      let data = {
        dateStart: (this.startAndEndDate && this.startAndEndDate.length) ? formatDateToStr(this.startAndEndDate[0]).slice(0, 10) : '',
        dateEnd: (this.startAndEndDate && this.startAndEndDate.length) ? formatDateToStr(this.startAndEndDate[1]).slice(0, 10) : '',
      }
      // 区域车辆统计
      this.$ajax(url.areaCarTj, data).then(res => {
        if (res.success) {
          this.tableData3 = res.data || [];
        }
      });
    },
    onQuery() {
      /*let data = {
        dateStart: (this.startAndEndDate && this.startAndEndDate.length) ? formatDateToStr(this.startAndEndDate[0]).slice(0, 10) : '',
        dateEnd: (this.startAndEndDate && this.startAndEndDate.length) ? formatDateToStr(this.startAndEndDate[1]).slice(0, 10) : '',
      }*/
      // 地图点位坐标
      this.$ajax(url.getDataAll, {}).then(res => {
        if(res.success) {
          // this.point(res.data);
          this.points = res.data;  // 所有坐标点
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/style/mixin.less';
  .page{
    padding-bottom: 60px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .el-row {
      // height: 100%;
      .el-col{
        // height: 100%;
        .amap-box {
          width: 100%;
          height: 1302px;
          overflow: hidden;
          position: relative;
          .right-time{
            position: absolute;
            z-index: 10000;
            left: 45px;
            top: 5px;
            // display: flex;
          }
          .sMap {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
        /deep/ .el-card__header{
          background: @blue;
          color: #fff;
        }
        .box-card{
          height: 430px;
          margin-bottom: 6px;
        }
      }
    }
  }
  .chart3 {
    width: 100%;
    // height: 400px;
  }
  .el-table{
    overflow:visible !important;
  }
  .time-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    button {
      margin-left: 10px;
    }
  }
</style>
