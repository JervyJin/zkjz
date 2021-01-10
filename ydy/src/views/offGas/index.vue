<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机动车尾气影响分析</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bot">
      <div class="left">
        <el-row :gutter="15">
          <el-col :span="12">
            <el-select placeholder="请选择" v-model="searchQuery.district" clearable>
              <el-option
                style="width: 100%"
                v-for="district in districts"
                :key="district.value"
                :label="district.label"
                :value="district.value"
              />
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select placeholder="请选择" v-model="searchQuery.areaId" clearable>
              <el-option
                style="width: 100%"
                v-for="city in citys"
                :key="city.areaId"
                :label="city.areaName"
                :value="city.areaId"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row class="date">
          <el-col :span="24">
            <el-date-picker
              v-model="searchQuery.date"
              type="daterange"
              unlink-panels
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row class="date">
          <el-col :span="24">
            <el-button type="primary" @click="changeData">查询</el-button>
          </el-col>
        </el-row>
        <div class="name">
          市区已覆盖
          <span>街道{{TanTouNums.streetCount || 0}}、探头{{TanTouNums.cameraCount || 0}}个</span>
        </div>
        <div class="title">郑州市区域PM统计：</div>
        <!-- <vChart class="chart0" :options="barOptions" /> -->
        <div class="chart0">
          <div class="item">
            <span  class="area_index" >序号</span>
            <span  class="area">区域</span>
            <span class="count">排放总量(mg)</span>
          </div>
          <div class="item item-nodata" v-if="!barOptionsX.length">暂无数据</div>
          <div class="item" v-else v-for="(v, i) in barOptionsX" :key="i" @click="selectCamera(v)">
            <span class="area_index">{{i+1}}</span>
            <el-tooltip :content="v.areaName" placement="top" class="area">
              <span :class="searchQuery.cameraId==v.cameraId ?'active' : ''">{{v.areaName}}</span>
            </el-tooltip>
            <!-- <span class="bar">
              <span
                class="bar-in"
                :style="{width: v.vehicleCount / barOptionsR[0].vehicleCount * 100 + '%'}"
              ></span>
            </span> -->
            <span class="count">{{v.vehicleCount}}</span>
          </div>
        </div>
        <div class="title">郑州市街道PM统计：</div>
        <!-- <vChart class="chart0" :options="barOptions" /> -->
        <div class="chart0">
          <div class="item">
            <span class="area_index">序号</span>
            <span class="area">街道</span>
            <span class="count">排放总量(mg)</span>
          </div>
          <div class="item item-nodata" v-if="!barOptionsR.length">暂无数据</div>
          <div class="item" v-else v-for="(v, i) in barOptionsR" :key="i" @click="selectCamera(v)">
            <span class="area_index">{{i+1}}</span>
            <el-tooltip :content="v.streetName" placement="top" class="area">
              <span :class="searchQuery.cameraId==v.cameraId ?'active' : ''">{{v.streetName}}</span>
            </el-tooltip>
            <!-- <span class="bar">
              <span
                class="bar-in"
                :style="{width: v.vehicleCount / barOptionsR[0].vehicleCount * 100 + '%'}"
              ></span>
            </span> -->
            <span class="count">{{v.vehicleCount}}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="tabs">
          <span :class="currentTab == 1 ? 'active' : 'inactive'" @click="currentTab = 1">地图</span>
          <span :class="currentTab == 2 ? 'active' : 'inactive'" @click="currentTab = 2">列表</span>
        </div>

        <template v-if="currentTab == 1">
          <div class="map">
            <SMap :currentMap="currentMap" :allPoints="allPoints" :type="1" :cameraId="searchQuery.cameraId"/>
            <div class="tabs tabs-map">
              <span :class="currentMap == 1 ? 'active' : 'inactive'" @click="currentMap = 1">地图</span>
              <span :class="currentMap == 2 ? 'active' : 'inactive'" @click="currentMap = 2">热力图</span>
            </div>
          </div>
        </template>

        <template v-if="currentTab == 2">
          <el-table border :data="carData">
            <el-table-column label="机动车类型" fixed>
              <template slot-scope="scope">颗粒物排放量(mg)</template>
            </el-table-column>
            <template v-for="(val, ind) in carData">
              <el-table-column :label="k" v-for="(o, k, i) in val" :key="ind+i+''">
                <template slot-scope="scope">{{o}}</template>
              </el-table-column>
            </template>
          </el-table>

          <el-card class="box-card">
            <div class="top">
              <span>各类机动车影响占比</span>
              <span class="icons">
                <i class="bar" :class="currentTip==1 ? 'active' : ''" @click="currentTip=1">
                  <img src="@/assets/image/bar1.png" v-if="currentTip==1">
                  <img src="@/assets/image/bar.png" v-else>
                </i>
                <i class="pie" :class="currentTip==2 ? 'active' : ''" @click="currentTip=2">
                  <img src="@/assets/image/pie1.png" v-if="currentTip==2">
                  <img src="@/assets/image/pie.png" v-else>
                </i>
              </span>
            </div>
            <vChart class="chart1" :options="currentTip==1 ? barOptions1 : barOptions2" auto-resize />
          </el-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SMap from "./map.vue";
import url from "@/servers/url-config";
// import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
import { formatDateToStr } from "@/utility/utility.js";
export default {
  data() {
    function getPastDate() {
      let nowDate = new Date();
      let date = new Date(nowDate);
      date.setDate(date.getDate() - 1);
      return date;
    }
    // let self = this;
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      currentTab: 1, // 1 地图 2 列表
      currentTip: 1, //
      currentMap: 1, // 地图1 热力图2
      searchQuery: {
        district: 0,
        areaId: 0,
        date: [getPastDate(), getPastDate()],
        cameraId: ''
      },
      TanTouNums: {},
      barOptionsR: [],
      barOptionsX:[],
      districts: [
        {
          label: "郑州",
          value: 0,
        },
      ],
      citys: [
        {
          label: "全市",
          value: 0,
        },
      ],
      allPoints: [],
      barOptions: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "5%",
          bottom: "20%",
          right: "5%",
          left: "10%",
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["中原", "金水", "二七", "管城", "东区"],
        },
        series: [
          {
            name: "邮件营销",
            type: "bar",
            barWidth: "20%",
            stack: "总量",
            data: [120, 432, 641, 854, 970],
          },
        ],
      },
      barOptions1: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "20%",
          bottom: "20%",
          right: "10%",
          left: "10%",
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          name: '单位(%)',
          nameLocation: 'end',
          type: "value",
          splitNumber: 5,
          max: 100,
          min: 0
        },
        series: [
          {
            name: "占比",
            type: "bar",
            barWidth: "20%",
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%'
            },
            data: [],
          },
        ],
      },
      barOptions2: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "20%",
          bottom: "20%",
          right: "10%",
          left: "10%",
        },
        series: [
          {
            type: "pie",
            barWidth: "20%",
            stack: "总量",
            label: {
              show: true,
              position: 'top',
              formatter: '{b} {c}%'
            },
            data: [
              // { name: "大型客车",value: 120,  },
              // { value: 432, name: "中型客车" },
              // { value: 854, name: "小型客车" },
              // { value: 641, name: "微型客车" },
            ],
          },
        ],
      },
      // map: {
      //   amapManager: new AMapManager(),
      //   address: null,
      //   searchKey: '',
      //   markers: [
      //     [113.645422, 34.730936],
      //     [113.685313,34.746453],
      //     [113.628106,34.748236],
      //     [113.686037,34.775838],
      //     [113.298282,34.808689]
      //   ],
      //   lng: 0,
      //   lat: 0,
      //   center: [113.645422, 34.730936], // '南京市',113.645422,34.730936
      //   zoom: 10,
      //   events: {
      //     init () {
      //       lazyAMapApiLoaderInstance.load().then(() => {
      //         self.initMap()
      //       })
      //     },
      //     // 点击获取地址的数据
      //     click (e) {
      //       // console.log(e)
      //       // self.map.markers = []
      //       let { lng, lat } = e.lnglat
      //       self.map.lng = lng
      //       self.map.lat = lat
      //       self.map.center = [lng, lat]
      //       self.map.markers.push([lng, lat])
      //       // 这里通过高德 SDK 完成。
      //       let geocoder = new AMap.Geocoder({
      //         radius: 1000,
      //         extensions: 'all'
      //       })
      //       geocoder.getAddress([lng, lat], function (status, result) {
      //         if (status === 'complete' && result.info === 'OK') {
      //           if (result && result.regeocode) {
      //             console.log(result.regeocode.formattedAddress)
      //             alert(result.regeocode.formattedAddress)
      //             self.map.address = result.regeocode.formattedAddress
      //             self.map.searchKey = result.regeocode.formattedAddress
      //             self.$nextTick()
      //           }
      //         }
      //       })
      //     }
      //   }
      // },
      // // 一些工具插件
      // plugin: [
      //   {
      //     pName: 'DistrictSearch',
      //     events: {
      //       init (o) {
      //         console.log('...')
      //       }
      //     }
      //   },
      //   // {
      //   //   pName: 'MassMarks',
      //   //   events: {
      //   //     init (o) {
      //   //       console.log('...')
      //   //     }
      //   //   }
      //   // },
      //   {
      //     // 定位
      //     pName: 'Geolocation',
      //     events: {
      //       init (o) {
      //         // o是高德地图定位插件实例
      //         o.getCurrentPosition((status, result) => {
      //           if (result && result.position) {
      //             // 设置经度
      //             self.lng = result.position.lng
      //             // 设置维度
      //             self.lat = result.position.lat
      //             // 设置坐标
      //             self.center = [self.lng, self.lat]
      //             self.markers.push([self.lng, self.lat])
      //             // load
      //             self.loaded = true
      //             // 页面渲染好后
      //             self.$nextTick()
      //           }
      //         })
      //       }
      //     }
      //   },
      //   {
      //     // 工具栏
      //     pName: 'ToolBar',
      //     events: {
      //       init (instance) {
      //         // console.log(instance);
      //       }
      //     }
      //   },
      //   {
      //     // 鹰眼
      //     pName: 'OverView',
      //     events: {
      //       init (instance) {
      //         // console.log(instance);
      //       }
      //     }
      //   },
      //   {
      //     // 地图类型
      //     pName: 'MapType',
      //     defaultType: 0,
      //     events: {
      //       init (instance) {
      //         // console.log(instance);
      //       }
      //     }
      //   },
      //   {
      //     // 搜索
      //     pName: 'PlaceSearch',
      //     events: {
      //       init (instance) {
      //         // console.log(instance)
      //       }
      //     }
      //   },
      //   {
      //     // 热力图
      //     pName: 'Heatmap',
      //     events: {
      //       init (instance) {
      //         // console.log(instance)
      //       }
      //     }
      //   }
      // ],
      carData: [
        // {
        //   大型客车: "20%",
        //   中型客车: "20%",
        //   小型客车: "20%",
        //   微型客车: "20%",
        // },
      ],

    };
  },

  // watch:{
  //     'barOptions2.series[0].data':{
  //       handler(newVal, oldVal){
  //         this.barOptions2.series[0].data = newVal;
  //       },
  //       immediate: true,
  //       deep: true,
  //     }
  // },

  components: {
    SMap,
  },
  watch: {
    currentTab(v) {
      if(v == 1) {
        this.getPoints();
      }
    },
    'searchQuery.areaId'() {
      this.searchQuery.cameraId = ''; // 区域切换后当前设备清空
    }
  },
  methods: {
    // 获取区域接口
    getData() {
      let data = {
        // requireTotalCount: true,
        // queryValues: {},
      };
      this.$ajax(url.HYWQXT_WQCSQY, data).then((res) => {
        res = JSON.parse(res)
        if (res.resultCode == 200) {
          this.citys = res.result;
          this.searchQuery.areaId = this.citys[0].areaId;
          this.changeData();
        }
      });
    },
    // 日期改变触发的事件
    changeData() {
      this.getTanTou();
      this.getStrat();
      this.getBar();
      this.getPoints();
    },
    // 选中某个摄像头点
    selectCamera(v) {
      this.searchQuery.cameraId = v.cameraId;
      this.getBar();
      this.getPoints(1);
    },
    // 当前区域已覆盖。。。
    getTanTou() {
      // let str = this.searchQuery.data.split(',')
      let data = {
        // requireTotalCount: true,
        // queryValues: {
        areaId: this.searchQuery.areaId,
        startTime: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[0]).split(' ')[0] : '',
        endTime: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[1]).split(' ')[0] : '',
        // },
      };
      // 探头接口
      this.$ajax(url.HYWQXT_WQSXTHJDSL, data).then((res) => {
        res = JSON.parse(res)
        if (res.resultCode == 200) {
          res.result.forEach((item) => {
            this.TanTouNums = item;
          });
        }
      });

    },

    // 街道机动车数量排名
    getStrat() {
      let data = {
        // queryValues: {
        areaId: this.searchQuery.areaId,
        startTime: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[0]).split(' ')[0] : '',
        endTime: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[1]).split(' ')[0] : '',
        // },
      };
      this.$ajax(url.HYWQXT_WQJDJDCSLPM, data).then((res) => {
        res = JSON.parse(res)
        if (res.resultCode == 200) {
          if(res.result.length) {
            this.barOptionsR = res.result;
            // if(res.result.length > 4) {
            //   this.barOptionsR = res.result.slice(0, 5);
            // }
          }
        }
      });
      // 郑州市区域PM统计
      this.$ajax(url.getQypflpm, data).then((res) => {
        res = JSON.parse(res)
        console.log(res,77777)
        if (res.resultCode == 200) {
          if(res.result.length) {
            this.barOptionsX = res.result;
            // if(res.result.length > 4) {
            //   this.barOptionsR = res.result.slice(0, 5);
            // }
          }
        }
      });
    },
    // 列表-柱状图
    getBar() {
      // let str = this.searchQuery.data.split(',')
      let data = {
        // requireTotalCount: true,
        // queryValues: {
        areaId: this.searchQuery.areaId,
        cameraId: this.searchQuery.cameraId,
        startTime: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[0]).split(' ')[0] : '',
        endTime: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[1]).split(' ')[0] : '',
        // },
      };
      // 柱状图
      this.$ajax(url.HYWQXT_WQZZT, data).then((res) => {
        res = JSON.parse(res)
        if (res.resultCode == 200) {
          let total = 0
          res.result.forEach(v => {
            total += Number(v.pollutantWeight);
          });
          let obj = {};
          this.barOptions1.xAxis.data = [];
          this.barOptions1.series[0].data = [];
          this.barOptions2.series[0].data = [];
          res.result.forEach((item) => {
            let key = item.vehicleType;
            let val = item.pollutantWeight;
            let percent = parseInt(val / total * 100)
            // obj[key] = percent;
            obj[key] = val;

            this.barOptions1.xAxis.data.push(item.vehicleType);
            this.barOptions1.series[0].data.push(percent);


            this.barOptions2.series[0].data = res.result.map((item) => {
              return {value: percent, name: item.vehicleType};
            });

          });
          this.carData = [obj];
        }
      });

    },
    // 坐标地图
    getPoints() {
      let data = {
        // requireTotalCount: true,
        // queryValues: {
        cameraId: this.searchQuery.cameraId,
        areaId: this.searchQuery.areaId,
        startTime: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[0]).split(' ')[0] : '',
        endTime: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[1]).split(' ')[0] : '',
        // },
      };
      this.$ajax(url.HYWQXT_WQDTZB, data).then((res) => {
        res = JSON.parse(res)
        if (res.resultCode == 200) {
          this.allPoints = res.result;
        }
      });
    },

  },
  created() {
    this.getData();

  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/mixin.less";
.page {
  height: 100%;
  padding-bottom: 20px;
  overflow-y: auto;

  .bot {
    display: flex;
    .tab {
      height: 28px;
      font-size: 12px;
      color: #333333;
    }
    .left {
      width: 17%;
      .district {
        margin-right: 16px;
      }
      .date {
        margin-top: 8px;
        /deep/ .el-date-editor {
          width: 100%;
        }
      }
      .name {
        font-size: 13px;
        color: #333333;
        margin: 20px 0;
        span {
          color: #1890ff;
        }
      }
      .title {
        margin-top: 20px;
      }
      .chart0 {
        width: 100%;
        height: 200px;
        overflow-y: auto;
        border: 1px solid #DCDFE6;
        border-top: none;
        margin-top: 15px;
        font-size: 12px;
        //height: 165px;
        .item {
          padding: 7px 10px;
          border-top: 1px solid #DCDFE6;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .area {
            display: inline-block;
            width: 100px;
            overflow: hidden;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-right: 1px solid #DCDFE6;
            border-left: 1px solid #DCDFE6;
            &.active{
              color: #1890ff;
            }
          }
          .area_index{
            width: 20px;
            // border-right: 1px solid #DCDFE6;
          }
          .count {
            width: 77px;
            text-align: center;
          }
          // .bar {
          //   display: inline-block;
          //   vertical-align: middle;
          //   height: 20px;
          //   width: 160px;
          //   margin-right: 5px;
          //   .bar-in {
          //     display: inline-block;
          //     height: 100%;
          //     vertical-align: middle;
          //     background: #2f7fe3;
          //   }
          // }
        }
        .item-nodata {
          justify-content: center;
          color: #909399;
        }
      }
    }
    .right {
      width: 83%;
      // padding-bottom: 40px;
      position: relative;
      padding-top: 65px;
      padding-left: 25px;
      &.right1 {
        padding-top: 90px;
      }
      .tabs {
        position: absolute;
        top: 0;
        right: 24px;
        display: flex;
        cursor: pointer;
        span {
          width: 112px;
          height: 28px;
          text-align: center;
          line-height: 28px;
        }
        .inactive {
          color: #dbdbdb;
          border: 1px solid #dbdbdb;
        }
        .active {
          color: #fff;
          background-image: linear-gradient(270deg, #3396FF 2%, #04D298 100%);
          border: 1px solid #1890ff;
        }
      }
      .map {
        width: 100%;
        height: 580px;
        overflow: hidden;
        position: relative;
        .tabs-map {
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 1000;
          .inactive {
            background: #fff;
            // color: #3396FF;
          }
        }
      }

      .box-card {
        margin-top: 15px;
        position: relative;
        .icons {
          position: absolute;
          right: 20px;
          top: 20px;
          i.active {
            // background: @blue;
          }
          i,img{
            float: left;
            width: 30px;
            height: 30px;
            // border: 1px solid @divider;
          }
        }
      }

      .chart1 {
        width: 100%;
        height: 385px;
      }
    }
  }
}
</style>
