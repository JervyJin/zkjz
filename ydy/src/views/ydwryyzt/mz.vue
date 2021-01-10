// M站系统
<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
        <!-- <el-amap
          class="amap-box"
          :amap-manager="map.amapManager"
          :vid="'amap-vue'"
          :zoom="map.zoom"
          :plugin="map.plugin"
          :center="map.center"
          :events="map.events"
        >
          <el-amap-marker 
            v-for="(marker, i) in map.markers" :key="i*101+1"
            :position="marker.position"
            :events="marker.events"
            >
          </el-amap-marker>
          
          <el-amap-info-window
            v-if="map.window"
            :position="map.window.position"
            :visible="map.window.visible"
            :content="map.window.content"
            :offset="map.window.offset"
            :close-when-click-map="true"
            :is-custom="true"
          >
            <el-card>
              <div slot="header" class="clearfix">
                <span>公司信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="map.window.visible=false;">X</el-button>
              </div>
              <div class="form_container">
                <el-form :model="form" label-position="right" label-width="80px">
                  <el-form-item label="用户名：">
                    <span>{{form.userName}}</span>
                  </el-form-item>
                  <el-form-item label="公司名称：">
                    <span>{{form.companyName}}</span>
                  </el-form-item>
                  <el-form-item label="信用代码：">
                    <span>{{form.credietCode}}</span>
                  </el-form-item>
                  <el-form-item label="行业类型：">
                    <span>{{form.industeyType}}</span>
                  </el-form-item>
                  <el-form-item label="行政区划：">
                    <span>{{form.administrativeArea}}</span>
                  </el-form-item>
                  <el-form-item label="地址：">
                    <span>{{form.address}}</span>
                  </el-form-item>
                  <el-form-item label="东经：">
                    <span>{{form.establishTime[0]}}</span>
                  </el-form-item>
                  <el-form-item label="北纬：">
                    <span>{{form.establishTime[1]}}</span>
                  </el-form-item>
                  <el-form-item label="法人：">
                    <span>{{form.legalPerson}}</span>
                  </el-form-item>
                  <el-form-item label="联系人：">
                    <span>{{form.contacts}}</span>
                  </el-form-item>
                  <el-form-item label="联系电话：">
                    <span>{{form.contactPhone}}</span>
                  </el-form-item>
                  <el-form-item label="成立日期：">
                    <span>{{form.establishTime}}</span>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-amap-info-window>
        </el-amap> -->
        <div class="amap-box">
          <sMap :points="points"/>
        </div>
        <el-card class="chart-card box-card">
          <div slot="header" class="clearfix">
            <span>郑州市M站不合格车辆统计</span>
          </div>
          <vChart class="chart" :options="Options" ref="chart1" auto-resize/>
        </el-card>
      </el-col>
      <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <el-card class="chart-card">
          <div slot="header" class="clearfix">
            <span>郑州M站预约维修车辆统计(昨日)</span>
          </div>
          <vChart class="chart" :options="barOptions" ref="chart2" auto-resize/>
          <!-- <el-table
            :data="tableData"
            border
            stripe
            height="230"
          >
            <el-table-column prop="address" label="区域" show-overflow-tooltip></el-table-column>
            <el-table-column prop="in" label="入站"></el-table-column>
            <el-table-column prop="out" label="出站"></el-table-column>
          </el-table> -->
        </el-card>
        <el-card class="chart-card box-card">
          <div slot="header" class="clearfix">
            <span>郑州市M站车辆订单统计(昨日)</span>
          </div>
          <vChart class="chart" :options="barOptions1" ref="chart3" auto-resize/>
          <!-- <el-table
            :data="tableData1"
            border
            stripe
            height="230"
          >
            <el-table-column prop="Rank" label="排名"></el-table-column>
            <el-table-column prop="companyName" label="公司名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="in" label="入站"></el-table-column>
            <el-table-column prop="out" label="出站"></el-table-column>
          </el-table> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';
import sMap from  './mjxt-map';
export default {
  data() {
    return {
      form: {
        depart: ''
      },
      Options: {
        color: ['#1890FF', '#64DAAC', '#FAC84A'],
        title: {
          text: "总计(辆)",
          left: "0",
          top: "0",
          textStyle: {
            fontSize: "10",
            color: "#000",
            fontStyle: "normal"
          }
        },
        grid: {
          top: '15%',
          bottom: '20%',
          right: '5%',
          left: '5%'
        },
        tooltip: {},
        legend: {
          data: ['总数'],
          top: '0%',
          right: '5%'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          // name: '车辆数',
          // nameLocation: 'end',
          type: 'value',
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
            {
                name: '总数',
                type: 'line',
                areaStyle: {},
                data: []
            }
        ]
      },
      tableData: [],
      tableData1: [],
      points: [],
      barOptions: {
        color: ['#1890FF', '#64DAAC', '#FAC84A'],
        title: {
          text: "总计(辆)",
          left: "5%",
          top: "0%",
          textStyle: {
            fontSize: "10",
            color: "#000",
            fontStyle: "normal"
          }
        },
        grid: {
          top: '15%',
          bottom: '20%',
          right: '5%',
          left: '15%'
        },
        tooltip: {},
        legend: {
          data: ['总数'],
          top: '0%',
          right: '5%'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          // name: '车辆数',
          // nameLocation: 'end',
          type: 'value',
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
            {
                name: '总数',
                type: 'bar',
                barWidth: '20%',
                barGap: '5%',
                data: []
            }
        ]
      },
      barOptions1: {
        color: ['#1890FF', '#64DAAC', '#FAC84A'],
        title: {
          text: "总计(辆)",
          left: "5%",
          top: "0%",
          textStyle: {
            fontSize: "10",
            color: "#000",
            fontStyle: "normal"
          }
        },
        grid: {
          top: '15%',
          bottom: '20%',
          right: '5%',
          left: '15%'
        },
        tooltip: {},
        legend: {
          data: ['总数'],
          top: '0%',
          right: '5%'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          // name: '车辆数',
          // nameLocation: 'end',
          type: 'value',
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
            {
                name: '总数',
                type: 'bar',
                barWidth: '20%',
                barGap: '5%',
                data: []
            }
        ]
      },
      
    }
  },
  components: {
    sMap
  },
  created() {
    this.getData();
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
    getData() {
      this.$ajax(url.getDataMZ, {}).then(res => {
        if(res.success) {
          this.points = res.data.map;  // 所有坐标点
          // this.tableData = res.data.MCarCountDayList || [];
          // this.tableData1 = res.data.MYesterdayRankList || [];
          this.Options.xAxis.data = res.data.UnqualifiedCarList.map(v => v.name);
          this.Options.series[0].data = res.data.UnqualifiedCarList.map(v => v.count);
          // this.point(res.data.map);

          this.barOptions.xAxis.data = res.data.MCarCountDayList.x;
          this.barOptions.series[0].data = res.data.MCarCountDayList.y.map(v => Number(v));

          this.barOptions1.xAxis.data = res.data.MYesterdayRankList.x;
          this.barOptions1.series[0].data = res.data.MYesterdayRankList.y.map(v => Number(v));
        }
      });
    },
    onSubmit() {

    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/style/mixin.less';
  .page{
    padding-bottom: 60px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .el-row {
      // height: 100%;
      .el-col{
        // height: 100%;
        .amap-box {
          // height: calc(100vh - 250px);
          height: 380px;
          // .form_container {
          //   height: 300px;
          //   overflow: auto;
          // }
        }
        /deep/ .el-card__header{
          background: @blue;
          color: #fff;
        }
        .chart-card {
          height: 380px;
          .chart{
            height: 290px;
            width: 100%;
          }
        }
        .box-card{
          margin-top: 20px;
          // height: 33%;
          &.box-card1{
            // margin-bottom: 20px;
            // /deep/ .el-card__body {
            //   height: 100%;
            //   overflow-y: auto;
            // }
          }
          // .card1 {
          //   height: 90%;
          //   overflow-y: auto;
          // }
        }
      }
    }
  }
</style>