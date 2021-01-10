// 门禁系统
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
        <el-card class="box-card chart-card">
          <div slot="header" class="clearfix">
            <span>郑州门禁当月管控数量</span>
          </div>
          <vChart class="chart" :options="Options" auto-resize />
        </el-card>
      </el-col>
      <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <el-card class="chart-card">
          <div slot="header" class="clearfix">
            <span>郑州区县进出统计(昨日)</span>
          </div>
          <el-table
            :data="tableData"
            show-summary
            border
            stripe
            height="690"
          >
            <el-table-column prop="name" label="区域" show-overflow-tooltip></el-table-column>
            <el-table-column prop="j" label="入站"></el-table-column>
            <el-table-column prop="c" label="出站"></el-table-column>
          </el-table>
        </el-card>
        <el-card class="box-card chart-card">
          <div class="right-time">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="startAndEndDate"
            ></el-date-picker>
            <el-button type="primary" @click="search">查询</el-button>
          </div>
          <div slot="header" class="clearfix">
            <span>郑州市重污染天气预警管控统计</span>
            <!--<div style="display: inline-block;float: right">
              <span>管控等级</span>
              <img style="width: 20px;height: 20px" src="@/assets/image/ask.png"/>
            </div>-->
            <el-popover
              placement="left"
              width="500"
              trigger="hover">
              <div style="padding: 0 20px 20px;">
                <div style="font-size: 16px;font-weight: 700;text-align: center;height: 50px;line-height: 50px">预警等级说明</div>
                <el-row :gutter="15">
                  <el-col :span="8">
                    <div style="border: 3px solid yellow;border-radius: 15px;">
                      <div class="warning-title">黄色预警</div>
                      <el-row :gutter="15">
                        <el-col :span="12"><div class="item-title">国六</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-check"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国五</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-check"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国四</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-check"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国三</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-check"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国二</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国一</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div style="border: 3px solid orange;border-radius: 15px">
                      <div class="warning-title">橙色预警</div>
                      <el-row :gutter="15">
                        <el-col :span="12"><div class="item-title">国六</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-check"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国五</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-check"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国四</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国三</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国二</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国一</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div style="border: 3px solid red;border-radius: 15px">
                      <div class="warning-title">红色预警</div>
                      <el-row :gutter="15">
                        <el-col :span="12"><div class="item-title">国六</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国五</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国四</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国三</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国二</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                        <el-col :span="12"><div class="item-title">国一</div></el-col>
                        <el-col :span="12"><div class="item-title"><i class="el-icon-close"></i></div></el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!--<el-button slot="reference">click 激活</el-button>-->
              <div slot="reference" style="display: inline-block;float: right;cursor: pointer">
                <span>管控等级</span>
                <img style="width: 20px;height: 20px" src="@/assets/image/ask.png"/>
              </div>
            </el-popover>
          </div>
          <el-table
            :data="tableData1"
            border
            stripe
            show-summary

          >
            <el-table-column prop="name" label="区域" show-overflow-tooltip></el-table-column>
            <el-table-column prop="yjdjmc" label="管控等级" width="110" show-overflow-tooltip>
              <!--<template slot-scope="scope">
                <span>{{scope.row.yellow | dataShow}}</span>
              </template>-->
            </el-table-column>
            <!-- <el-table-column prop="j" label="入站">
              <template slot-scope="scope">
                <span>{{scope.row.orange | dataShow}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="c" label="出站"></el-table-column> -->
            <el-table-column prop="san" label="国三"></el-table-column>
            <el-table-column prop="si" label="国四"></el-table-column>
            <el-table-column prop="wu" label="国五"></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>郑州市门禁通行统计</span>
          </div>
          <div class="chart1">
            <el-form :inline="true" :model="orgForm">
              <el-form-item label="企业名称：">
                <el-input v-model="orgForm.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="时间:">
                <el-date-picker
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  v-model="startAndEndDate2"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="searchTable">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              height="400"
              class="table"
              :data="tableData2"
              border
              v-loading="loading"
              element-loading-text="拼命加载中"
              stripe
            >
              <el-table-column type="index" prop="index" label="序号"></el-table-column>
              <el-table-column prop="jgmc" label="企业名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="j" label="入站"></el-table-column>
              <el-table-column prop="c" label="出站"></el-table-column>
              <el-table-column prop="san" label="国三"></el-table-column>
              <el-table-column prop="si" label="国四"></el-table-column>
              <el-table-column prop="wu" label="国五"></el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :current-page="orgForm.page"
        :page-size="orgForm.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="pageparm.total">
      </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';
import sMap from  './mjxt-map'
// import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
export default {
  data() {
    let self = this;
    return {
      // map: {
      //   amapManager: new AMapManager(),
      //   searchKey: "",
      //   markers: [
      //     // [113.645422, 34.730936],
      //     // [113.685313, 34.746453],
      //     // [113.628106, 34.748236],
      //     // [113.686037, 34.775838],
      //     // [113.298282, 34.808689]
      //   ],
      //   lng: 0,
      //   lat: 0,
      //   center: [113.645422, 34.730936], // '南京市',113.645422,34.730936
      //   zoom: 10,
      //   events: {
      //     init() {
      //       lazyAMapApiLoaderInstance.load().then(() => {
      //         self.initSearch();
      //       });
      //     }
      //   },
      //   windows: [],
      //   window: "",
      // },
      // 一些工具插件
      // plugin: [
      //   {
      //     pName: "DistrictSearch",
      //     events: {
      //       init(o) {
      //         console.log("...");
      //       }
      //     }
      //   },
      //   {
      //     // 定位
      //     pName: "Geolocation",
      //     events: {
      //       init(o) {
      //         // o是高德地图定位插件实例
      //         o.getCurrentPosition((status, result) => {
      //           if (result && result.position) {
      //             // 设置经度
      //             self.lng = result.position.lng;
      //             // 设置维度
      //             self.lat = result.position.lat;
      //             // 设置坐标
      //             self.center = [self.lng, self.lat];
      //             self.markers.push([self.lng, self.lat]);
      //             // load
      //             self.loaded = true;
      //             // 页面渲染好后
      //             self.$nextTick();
      //           }
      //         });
      //       }
      //     }
      //   },
      //   {
      //     // 工具栏
      //     pName: "ToolBar",
      //     events: {
      //       init(instance) {
      //         // console.log(instance);
      //       }
      //     }
      //   },
      //   {
      //     // 鹰眼
      //     pName: "OverView",
      //     events: {
      //       init(instance) {
      //         // console.log(instance);
      //       }
      //     }
      //   },
      //   {
      //     // 地图类型
      //     pName: "MapType",
      //     defaultType: 0,
      //     events: {
      //       init(instance) {
      //         // console.log(instance);
      //       }
      //     }
      //   },
      //   {
      //     // 搜索
      //     pName: "PlaceSearch",
      //     events: {
      //       init(instance) {
      //         // console.log(instance)
      //       }
      //     }
      //   }
      // ],

      loading: false, //table Loading

      orgForm: {
        page: 1,
        pageSize: 10,
        name:'',
      },
      pageparm: {
        total: null
      },
      form: {
        depart: ''
      },
      startAndEndDate: new Date(new Date().getTime() - 24*60*60*1000),
      startAndEndDate2: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)],
      Options: {
        color: ['#1890FF', '#64DAAC', '#FAC84A'],
        title: {
          text: "总计(辆)",
          left: "0",
          top: "0",
          // bottom:"40%",
          textStyle: {
            fontSize: "0.072917rem",
            color: "#000",
            fontStyle: "normal"
          }
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '5%',
          left: '6%'
        },
        tooltip: {},
        legend: {
          data: ['入', '出'],
          top: '0%',
          right: '5%'
        },
        xAxis: {
          type: 'category',
          data: ['8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7', '8.8']
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
                name: '入',
                type: 'line',
                areaStyle: {},
                data: [20, 232, 441, 654, 770, 530, 410, 890]
            },
            {
                name: '出',
                type: 'line',
                areaStyle: {},
                data: [120, 482, 791, 834, 590, 930, 710, 450]
            }
        ]
      },
      tableData: [
        {
          area: "中原区",
          in: "2467",
          out: "1709"
        },
        {
          area: "中原区",
          in: "2467",
          out: "1709"
        },
        {
          area: "中原区",
          in: "2467",
          out: "1709"
        },
        {
          area: "中原区",
          in: "2467",
          out: "1709"
        },
        {
          area: "中原区",
          in: "2467",
          out: "1709"
        }
      ],
      tableData1: [
        {
          rank: "1",
          company: '中科九州',
          in: "2467",
          out: "1709"
        },
        {
          rank: "1",
          company: '中科九州',
          in: "2467",
          out: "1709"
        },
        {
          rank: "1",
          company: '中科九州',
          in: "2467",
          out: "1709"
        },
        {
          rank: "1",
          company: '中科九州',
          in: "2467",
          out: "1709"
        },
        {
          rank: "1",
          company: '中科九州',
          in: "2467",
          out: "1709"
        },
      ],
      tableData2:[],
      points: []
    }
  },
  components: {
    sMap
  },
  created() {
    this.getData();
    this.getData2();
  },
  filters: {
    dataShow (v) {
      if (v === 1) {
        return '管控中'
      } else {
        return v;
      }
    }
  },
  // watch: {
  //   'map.window': {
  //     deep: true,
  //     immediate: true,
  //     handler(v) {
  //       if(!v) return;
  //       if(v.item) {
  //         this.form = v.item || {};
  //       }
  //     }
  //   }
  // },
  methods: {
    // initSearch() {
    //   let vm = this;
    //   let map = this.map.amapManager.getMap();
    //   new AMap.DistrictSearch({
    //     extensions: "all",
    //     subdistrict: 0
    //   }).search("郑州市", function(status, result) {
    //     // 外多边形坐标数组和内多边形坐标数组
    //     var holes = result.districtList[0].boundaries;
    //     if (holes) {
    //       let polygons = [];
    //       for (var i = 0, l = holes.length; i < l; i++) {
    //         //生成行政区划polygon
    //         var polygon = new AMap.Polygon({
    //           strokeWeight: 2,
    //           path: holes[i],
    //           fillOpacity: 0.2,
    //           fillColor: "#ccc",
    //           strokeColor: "blue"
    //         });
    //         polygons.push(polygon);
    //       }
    //       map.add(polygons);
    //       map.setFitView(polygons); //视口自适应
    //     }
    //   });
    // },
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
      this.$ajax(url.getMapList, {}).then(res => {
        if (res.success) {
          this.points = res.data;  // 所有坐标点
        }
      });
      this.$ajax(url.getQxjctj, {}).then(res => {
        if (res.success) {
          this.tableData = res.data;  // 所有坐标点
        }
      });
      this.$ajax(url.getDygksl, {}).then(res => {
        if (res.success) {
          this.Options.xAxis.data = res.data.map(v => v.x);
          this.Options.series[0].data = res.data.map(v => v.in);
          this.Options.series[1].data = res.data.map(v => v.out);
        }
      });
      /*this.$ajax(url.getDataMJ, {}).then(res => {
        if(res.success) {
          // this.tableData = res.data.inAndOutStatisDayList || [];
          // this.tableData1 = res.data.inAndOutRankList || [];
          this.Options.xAxis.data = res.data.controlMonthList.map(v => v.x);
          this.Options.series[0].data = res.data.controlMonthList.map(v => v.in);
          this.Options.series[1].data = res.data.controlMonthList.map(v => v.out);
          // this.point(res.data.map);
          // this.tableData1 = res.data.earlyWarninglist;
        }
      });*/
      this.search();
    },
    search () {
      let queryParam = {
        time: this.startAndEndDate ? formatDateToStr(this.startAndEndDate).slice(0, 10) : '',
      };
      this.$ajax(url.getEarlyWarning, queryParam).then(res => {
        console.log(res,'!!!')
        if (res.success) {
          this.tableData1 = res.data;
        }
      });
    },
    getData2(){
      this.loading = true
      let query = {
        page: this.orgForm.page,
        pageSize: this.orgForm.pageSize,
        name: this.orgForm.name,
        startDate: this.startAndEndDate2 ? formatDateToStr(this.startAndEndDate2[0]).slice(0, 10) : '',
        endDate: this.startAndEndDate2 ? formatDateToStr(this.startAndEndDate2[1]).slice(0, 10) : '',
      };
      this.$ajax(url.getMjqygk, query).then(res => {
        this.loading = false;
        if(res.success) {
          this.tableData2 = res.data.list;
          this.pageparm.total = res.data.total;
        }
      });
    },
    searchTable () {
      this.orgForm.page = 1;
      this.orgForm.pageSize = 10;
      this.getData2();
    },
    // 分页事件
    handleCurrentChange(page) {
      this.orgForm.page = page;
      this.getData2()
    },
    handleSizeChange(size) {
      this.orgForm.pageSize = size;
      this.getData2()
    },
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
    /*/deep/ .el-table__footer-wrapper{
      position: fixed;
    }*/
    .el-row {
      // height: 100%;
      .el-col{
        // height: 100%;
        .amap-box {
          height: 790px;
          // height: calc(100vh - 250px);
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
          height: 790px;
          .chart{
            height: 690px;
            width: 100%;
          }
          .chart1{
        width: 100%;
        height: 368px;
      }
        }
        .box-card{
          margin-top: 20px;
          padding-bottom: 10px;
          // &.box-card1{
          //   margin-bottom: 4%;
          // }
        }
      }
    }
  }
  .el-table{
    overflow:visible !important;
  }
  .warning-title{
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    height: 40px;
    line-height: 40px
  }
  .item-title{
    text-align: center;
    line-height: 30px
  }
  .el-icon-check {
    color: green;
    font-weight: 700;
    font-size: 16px;
  }
  .el-icon-close {
    color: red;
    font-weight: 700;
    font-size: 16px;
  }
  .right-time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    button {
      margin-left: 10px;
    }
  }
</style>
