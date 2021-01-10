<template>
  <div class="page">
    <!--<el-form :inline="true" :model="query">
      &lt;!&ndash;<el-form-item label="区域：">
        <el-select v-model="query.area">
          <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
        </el-select>
      </el-form-item>&ndash;&gt;
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
        <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
      </el-form-item>
    </el-form>-->
    <!--<el-row class="points" :gutter="15">
      <el-col
        :span="6"
        v-for="(v, i) in points"
        :key="i"
      >
        <div class="points-container"
             :class="['point', i == 0 ? 'first' : i == 1 ? 'second' : i == 2 ? 'third': i == 3 ? 'fourth' : i == 4 ? 'first' : 'second']">
          <div class="key">{{v.key}}</div>
          <div class="val">{{v.val}}</div>
        </div>
      </el-col>
    </el-row>-->

    <el-row :gutter="10">
      <el-col :span="24">
        <el-card style="margin-top: 0">
          <el-form :inline="true" :model="query">
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
            <el-col
              :span="6"
              v-for="(v, i) in points"
              :key="i"
            >
              <div class="points-container"
                   :class="['point', i == 0 ? 'first' : i == 1 ? 'second' : i == 2 ? 'third': i == 3 ? 'fourth' : i == 4 ? 'first' : 'second']">
                <div class="key">{{v.key}}</div>
                <div class="val">{{v.val}}</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>公司/个人车辆信息</span>
          </div>
          <div>
            <div class="right-time">
              <el-form :inline="true">
                <el-form-item label="公司/个人名称:">
                  <el-input style="width: 250px;" v-model="searchName" placeholder="请输入公司/个人名称"></el-input>
                </el-form-item>
                <el-form-item label="时间:">
                  <el-date-picker
                    type="daterange"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    v-model="startAndEndDate"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="searchTable">查询</el-button>
                </el-form-item>
              </el-form>
              <!--<el-input style="width: 300px;margin: 0 20px 20px 0;" v-model="searchName" placeholder="请输入公司/个人名称"></el-input>
              <el-date-picker
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                v-model="startAndEndDate"
              ></el-date-picker>
              <el-button type="primary" @click="searchTable">查询</el-button>-->
            </div>
            <el-table
              :data="tableData1"
              border
              stripe
              v-loading="loading"
              element-loading-text="拼命加载中"
            >
              <el-table-column prop="clsyr" label="公司/个人名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="clzs" label="车辆总数"></el-table-column>
              <el-table-column prop="noxcbs" label="NOx浓度超标车次"></el-table-column>
              <el-table-column prop="btgdcbs" label="光吸收系数超标车次"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>

      <!-- 检测人员分布 -->
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>排放统计</span>
          </div>
          <div>
            <div class="right-time">
              <el-form :inline="true">
                <!--<el-form-item label="公司/个人名称:">
                  <el-input style="width: 250px;" v-model="searchName" placeholder="请输入公司/个人名称"></el-input>
                </el-form-item>-->
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
                  <el-button type="primary" icon="el-icon-search" @click="searchTjTable">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table
              :data="tableData2"
              border
              stripe
              v-loading="loading2"
              element-loading-text="拼命加载中"
              show-summary
            >
              <el-table-column prop="qy" label="区域" show-overflow-tooltip></el-table-column>
              <el-table-column prop="cozs" label="CO排放总量"></el-table-column>
              <el-table-column prop="hczs" label="HC排放总量"></el-table-column>
              <el-table-column prop="noxzs" label="NOx排放总量"></el-table-column>
              <el-table-column prop="pm10zs" label="PM10排放总量"></el-table-column>
              <el-table-column prop="pm25zs" label="PM25排放总量"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>

      <!--<el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>超标所在公司排名(Top 10)</span>
          </div>
          <div class="chart1">
            <el-table
              height="100%"
              class="table"
              :data="tableTopData"
              border
              stripe
            >
              <el-table-column type="index" prop="index" label="排名"></el-table-column>
              <el-table-column prop="xm" label="名称" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>-->
      <!-- 检测机构分布 -->
      <!--<el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>排放标准统计</span>
          </div>
          <vChart class="chart3" :options="barOptions_status" auto-resize />
        </el-card>
      </el-col>-->
    </el-row>
    <!-- <el-row :gutter="10" class="card1"> -->
    <!-- 检测状态分布 -->
    <!-- <el-col :span="12">
      <vChart class="chart3" :options="barOptions_status" />
    </el-col> -->
    <!-- 检测量分布 -->
    <!-- <el-col :span="12">
      <vChart class="chart3" :options="barOptions_num" />
    </el-col>
  </el-row> -->

  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';

export default {
  data() {
    return {
      query: {
        date: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)]
      },
      searchName: '',
      loading: false,
      loading2: false,
      startAndEndDate: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)],
      startAndEndDate2: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)],
      tableData1: [
        {name: '河南天茂机动车检测有限公司', clzs: 267409, cbclzs: 378},{name: '河南安吉车享家机动车检测有限公司', clzs: 298409, cbclzs: 678},
        {name: '蓝天机动车检测有限公司', clzs: 458409, cbclzs: 610},{name: '郑州速兴机动车检测有限公司', clzs: 356409, cbclzs: 378},
        {name: '郑州市鼎泰机动车检测有限公司', clzs: 289949, cbclzs: 269},{name: '河南恒通机动车检测中心', clzs: 668409, cbclzs: 883},
        {name: '河南佳鑫机动车检测有限公司', clzs: 188409, cbclzs: 178},{name: '郑州大承汽车检测有限公司', clzs: 176409, cbclzs: 273},
      ],
      tableData2: [],
      tableTopData: [
        {index: 1, xm: '河南省顺丰速运有限公司'}, {index: 2, xm: '郑州市保安服务公司'}, {index: 3, xm: '河南外事旅游汽车有限公司'},
        {index: 4, xm: '郑州精英面粉有限公司'}, {index: 5, xm: '郑州市陆航货运有限责任公司'}, {index: 6, xm: '河南省顺丰速运有限公司'},
        {index: 7, xm: '河南豫矿开源矿业有限公司'}, {index: 8, xm: '中牟平丰汽车零部件有限公司'}, {index: 9, xm: '郑州市邮政发展总公司'},
        {index: 10, xm: '河南省顺丰速运有限公司'}
      ],
      points: [
        { key: "OBD车辆总数", val: 0 },
        { key: "NOx浓度超标车次", val: 0 },
        { key: "在线总数", val: 0 },
        { key: "光吸收系数超标车次", val: 0 },
        /*{ key: "NOx总数", val: 0 },
        { key: "颗粒物总数", val: 42775 }*/
      ],
      barOptions_status: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        // grid: {
        //   top: "10%",
        //   bottom: "10%",
        //   right: "5%",
        //   left: "5%",
        // },

        tooltip: {},
        legend: {
          data: ["合格", "不合格", "未检测"],
          top: 0,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 15,
          },
          data: [
            "中原路",
            "秦岭路",
            "桐柏路",
            "中原路",
            "秦岭路",
            "中原路",
            "秦岭路",
            "中原路",
            "秦岭路",
            "中原路",
            "秦岭路",
          ],
        },
        yAxis: {
          name: '单位(辆)',
          nameLocation: 'end',
          type: "value",
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "车辆数",
            type: "bar",
            barWidth:"40%",
            data: [100, 200, 300, 500],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          // {
          //   name: "合格",
          //   type: "bar",
          //   // barWidth: "20%",
          //   data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          // },
          // {
          //   name: "不合格",
          //   type: "bar",
          //   data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          // },
          // {
          //   name: "未检测",
          //   type: "bar",
          //   data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          // },
        ],
      },
    };
  },
  created() {
    this.getData();
    this.searchTable();
    this.searchTjTable();
  },
  methods: {
    getData() {
      let query = {
        dateStart: this.query.date.length && formatDateToStr(this.query.date[0]) || '',
        dateEnd: this.query.date.length && formatDateToStr(this.query.date[1]) || ''
      }
      this.$ajax(url.getObdSum, query).then(res => {
        this.points[0].val = res.data.clsz;
        this.points[1].val = res.data.nozs;
        this.points[2].val = res.data.online;
        this.points[3].val = res.data.btgdzs;
        // this.points[4].val = res.data.nox;
      });
      /*this.$ajax(url.getIntoNum, query).then(res => {
        this.points[1].val = res.data;
      });
      this.$ajax(url.getOrganization, query).then(res => {
        this.points[2].val = res.data;
      });
      this.$ajax(url.getRote, query).then(res => {
        this.points[3].val = res.data;
      });*/
      /*this.$ajax(url.getPfbz, {}).then((res) => {
        if (res.success) {
          this.barOptions_status.xAxis.data = res.data.map((v) => v.pfjd);
          this.barOptions_status.series[0].data = res.data.map((v) => v.jxs);
        }
      });*/
    },
    searchTjTable () {
      let queryParam = {
        dateStart: this.startAndEndDate2 ? formatDateToStr(this.startAndEndDate2[0]).slice(0, 10) : '',
        dateEnd: this.startAndEndDate2 ? formatDateToStr(this.startAndEndDate2[1]).slice(0, 10) : '',
      };
      this.loading2 = true;
      this.$ajax(url.getPftj, queryParam).then(res => {
        this.loading2 = false;
        this.tableData2 = res.data;
      });
    },
    searchTable () {
      let queryParam = {
        dateStart: this.startAndEndDate ? `${(formatDateToStr(this.startAndEndDate[0]).slice(0, 10)).replace(/-/g, '/')} 00:00:00` : '',
        dateEnd: this.startAndEndDate ? `${(formatDateToStr(this.startAndEndDate[1]).slice(0, 10)).replace(/-/g, '/')} 23:59:59` : '',
        name: this.searchName,
      };
      this.loading = true;
      this.$ajax(url.getGsclzs, queryParam).then(res => {
        this.loading = false;
        this.tableData1 = res.data.list;
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .page {
    padding-bottom: 60px;
    // height: calc(100% - 100px);
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .title {

      color: #333333;
      font-weight: 700;
      line-height: 20px;
      margin: 20px 0;
    }
    .points {
      margin-top: 15px;
      .point {
        color: #fff;
        // width: 24%;
        // margin-right: 15px;
        // width: 392px;
        height: 120px;
        border-radius: 6px;
        padding: 10px 14px;
        &.first {
          background-image: linear-gradient(135deg, #1890ff 0%, #51abff 100%);
        }
        &.second {
          background-image: linear-gradient(-45deg, #ffb27b 0%, #fa964e 100%);
        }
        &.third {
          background-image: linear-gradient(135deg, #1890ff 0%, #51abff 100%);
        }
        &.fourth {
          background-image: linear-gradient(161deg, #9170f5 0%, #b593ff 100%);
        }
        .key {
          line-height: 22px;
          font-size: 16px;
          text-align: left;
        }
        .val {
          font-size: 28px;
          text-align: center;
          margin-top: 16px;
        }
      }
    }
    // .charts {
    //   width: 100%;
    //   margin-top: 16px;
    //   .charts1 {
    //     width: 66%;
    //   }
    //   .charts2 {
    //     width: 32%;
    //   }
    //   .chart {
    //     width: 100%;
    //     height: 370px;
    //   }
    // }

    .chart3 {
      width: 100%;
      // height: 237px;
      height: 287px;
    }

    // .chart4 {
    //   width: 100%;
    //   height: 259px;
    //   .chart4_1 {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }
    .card1{
      margin-top: 40px;
    }
    .el-card {
      margin-top: 20px;
    }
    .el-table{
      overflow:visible !important;
    }
  }
</style>
<!--<template>
  <div class="page">
    &lt;!&ndash; <map-c /> &ndash;&gt;
    <el-row :gutter="20">
      <el-col :xl="17" :lg="17" :md="17" :sm="24" :xs="24">
        <div id="map"></div>
      </el-col>

      <el-col :xl="7" :lg="7" :md="7" :sm="24" :xs="24">

           <div class="right-time">
              <el-date-picker
                v-model="luJianDate"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>

              <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
          <div class="tableWrap">
            <el-table :data="tableData" border stripe show-summary height="100%">
              <el-table-column prop="cph" label="车牌号"></el-table-column>
              <el-table-column prop="cs" label="车速"></el-table-column>
              <el-table-column prop="dqyl" label="大气压力"></el-table-column>
              <el-table-column prop="kz" label="k值"></el-table-column>
              &lt;!&ndash; <el-table-column  prop="date" label="操作" width="50">
            <template slot-scope="scope">
              <el-button @click="toDetail(scope.row)" type="text">详情</el-button>
            </template>
              </el-table-column>&ndash;&gt;
            </el-table>
          </div>
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="queryInfo.total"
            :current-page="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>

      </el-col>
    </el-row>

    <div class="box">
      <el-card>
        <div slot="header" class="clearfix">
          <span>排放标准统计</span>
        </div>
        <vChart :options="barOptions_status" auto-resize />
      </el-card>
    </div>
  </div>
</template>

<script>
import url from "@/servers/url-config.js";
import { formatDateToStr } from "@/utility/utility.js";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;
// import mapC from './jxfx-map'
export default {
  // components:{
  //   mapC
  // },
  data() {
    return {
      data: [],
      dialogInfo: {},
      map: null,
      data: [
        // {
        //   position: "113.645422, 34.730936",
        // },
        // {
        //   position: "113.685313,34.746453",
        // },
      ],

      barOptions_status: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        // grid: {
        //   top: "10%",
        //   bottom: "10%",
        //   right: "5%",
        //   left: "5%",
        // },

        tooltip: {},
        legend: {
          data: ["合格", "不合格", "未检测"],
          top: 0,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 15,
          },
          data: [
            "中原路",
            "秦岭路",
            "桐柏路",
            "中原路",
            "秦岭路",
            "中原路",
            "秦岭路",
            "中原路",
            "秦岭路",
            "中原路",
            "秦岭路",
          ],
        },
        yAxis: {
          name: '单位(辆)',
          nameLocation: 'end',
          type: "value",
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "车辆数",
            type: "bar",
            barWidth:"40%",
            data: [100, 200, 300, 500],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          // {
          //   name: "合格",
          //   type: "bar",
          //   // barWidth: "20%",
          //   data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          // },
          // {
          //   name: "不合格",
          //   type: "bar",
          //   data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          // },
          // {
          //   name: "未检测",
          //   type: "bar",
          //   data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          // },
        ],
      },

      luJianDate: [new Date(), new Date()],
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 10,
        total: null,
      },
      dialogInfo: {},

      tableData: [],
    };
  },
  mounted() {
    this.initMap();
  },
  created() {
    this.getData();
  },
  methods: {
    initMap() {
      let vectorLayer = L.supermap.tiledMapLayer(
        url.mapApi + "/map-mongodb-zzmap4490/rest/maps/zzmap4490",
        {
          maxZoom: 20,
          tileSize: 256,
          zoomOffset: 1,
        }
      );

      let map = L.map("map", {
        minZoom: 0,
        maxZoom: 19,
        crs: L.CRS.EPSG4326,
        layers: [vectorLayer],
      }).setView([34.730936, 113.645422], 10);

      let param = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
          name: "xzqh@xzqh",
          attributeFilter: "GB=410100",
        },
        datasetNames: ["xzqh:xzqh"],
      });
      L.supermap
        .featureService(url.mapApi + "/data-zzmap/rest/data")
        .getFeaturesBySQL(param, function (serviceResult) {
          let resultLayer = L.geoJSON(serviceResult.result.features, {
            style: function (feature) {
              return { color: "#03B180", weight: 1, fillOpacity: 0.1 };
            },
          }).addTo(map);
          //.bindPopup('SMID = 247');
        });

      // var map = L.map("map").setView([34.730936, 113.645422], 12);
      // L.tileLayer(
      //   "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      //   {
      //     maxZoom: 18,
      //     id: "mapbox.streets",
      //     accessToken:
      //       "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      //     attribution:
      //       'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      //       '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      //       'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      //   }
      // ).addTo(map);

      this.map = map;

      this.getposi();
    },
    getposi() {
      let m = this.map;
      this.$ajax(url.getMap, {
        dateStart: formatDateToStr(this.luJianDate[0]),
        dateEnd: formatDateToStr(this.luJianDate[1]),
      }).then((res) => {
        var group = L.layerGroup().addTo(m);

        res.data.forEach((item, index) => {
          var lat = item.wd;
          var lng = item.jd;
          var blueIcon = L.icon({
            iconUrl: icon,
            iconSize: [25, 41],
            iconAnchor: [13, 21],
          });

          var marker = L.marker([lat, lng], {
            icon: blueIcon,
            // draggable:true,
            // riseOnHover:true
          }).addTo(group);
          // .bindPopup(doms);

          var doms = `<div class="infoWindow">
              <div class="title">监控车辆信息</div>
              <div class="info">
              <p>
                  车牌号:
                  <span>${item.cph}</span>
                </p>
                <p>
                  车型:
                  <span>${item.cx}</span>
                </p>
                <p>
                  车辆所有人:
                  <span>${item.clsyr}</span>
                </p>
                <p>
                  车辆标识:
                  <span>${item.vindjh}</span>
                </p>
                <p>
                  经度:
                  <span>${item.jd}</span>
                </p>
                <p>
                  纬度:
                  <span>${item.wd}</span>
                </p>

              </div>
            </div>`;
          marker.bindPopup(doms);
        });
      });
    },

    /* *************************************************************************** */
    getData() {
      let Params = {
        dateStart: formatDateToStr(this.luJianDate[0]),
        dateEnd: formatDateToStr(this.luJianDate[1]),
        pageIndex: this.queryInfo.pagenum,
        pageSize: this.queryInfo.pagesize,
      };
      // 右侧列表
      this.$ajax(url.getList, Params).then((res) => {
        // console.log(res);
        this.tableData = res.data.list;
        this.queryInfo.total = res.data.total;
      });
      // 柱状图
      this.$ajax(url.getPfbz, {dateStart: formatDateToStr(this.luJianDate[0]),
        dateEnd: formatDateToStr(this.luJianDate[1]),}).then((res) => {
        if (res.success) {
          this.barOptions_status.xAxis.data = res.data.map((v) => v.pfjd);
          this.barOptions_status.series[0].data = res.data.map((v) => v.jxs);
          // this.barOptions_status.series[1].data = res.data.map(v => v.bhgs);
          // this.barOptions_status.series[2].data = res.data.map(v => v.wjcs);
        }
      });
    },

    /* *************************************************************************** */

    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getData();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagenum = newSize;
      this.getData();
    },
    toDetail() {
      this.$router.push("/analyse/ydwryyzt");
    },
    search(){
      this.getData();
      this.initMap();
    }
  },
};
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 60px;
    height: 100%;
    overflow-y: auto;
  #map {
    height: calc(100vh - 120px);
        overflow: hidden;
  }

  .right {
    width: 23.6%;
    font-size: 14px;
    position: relative;
    /deep/ .el-input__inner {
      width: 100%;
    }
  }
  .el-pagination {
    /* float: right; */
    margin-top: 60px;
    // bottom: 10px;
    // right: 0;
    // position: absolute;
  }

  .box {
    height: 300px;
    // background: #ccc;
  }
  .echarts {
    width: 100%;
}
}
.right-time{display: flex;}
/deep/.infoWindow {
      /deep/ .title {
        text-align: center;
        font-size: 14px;
        background: #2F7FE3;
        color: #fff;
      }
      /deep/ .info {
        max-height: 300px;
        overflow: auto;
      }
    }
.el-table{
  overflow:visible !important;
}
.tableWrap {
  height: calc(100vh - 250px);
  /*overflow: auto;*/
}
</style>-->
