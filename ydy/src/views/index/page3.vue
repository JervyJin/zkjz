<template>
  <div class="page">
    <!-- <map-c /> -->
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
          <el-table :data="tableData" border stripe height="100%" @row-click="selectRow">
            <el-table-column prop="cph" label="车牌号"></el-table-column>
            <el-table-column prop="scrxynd" label="NOx浓度"></el-table-column>
            <el-table-column prop="btgz" label="光吸收系数"></el-table-column>
            <el-table-column prop="nsyw" label="尿素液位"></el-table-column>
            <!-- <el-table-column  prop="date" label="操作" width="50">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text">详情</el-button>
          </template>
            </el-table-column>-->
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

    <!--<div class="box">
      <el-card>
        <div slot="header" class="clearfix">
          <span>排放标准统计</span>
        </div>
        <vChart :options="barOptions_status" auto-resize />
      </el-card>
    </div>-->
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
        group: null,
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

        luJianDate: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)],
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
            minZoom: 8,
            maxZoom: 20,
            tileSize: 256,
            zoomOffset: 1,
          }
        );

        let map = L.map("map", {
          minZoom: 8,
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

        // this.getposi();
      },
      getposi() {
        let m = this.map;
        // this.$ajax(url.getMap, {
        //   dateStart: formatDateToStr(this.luJianDate[0]),
        //   dateEnd: formatDateToStr(this.luJianDate[1]),
        // }).then((res) => {
          this.group = this.group ? this.group : L.layerGroup().addTo(m);
          let group = this.group;
          this.group.clearLayers(); // 清除现存所有markers

          // res.data.forEach((item, index) => {
          this.tableData.forEach((item, index) => {
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

            let doms = `<div class="infoWindow">
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
        // });
      },
      // 选中table某一行地图交互
      selectRow(row) {
        let lat = row.wd;
        let lng = row.jd;
        let blueIcon = L.icon({
          iconUrl: icon,
          iconSize: [25, 41],
          iconAnchor: [13, 21],
        });
        let doms = `<div class="infoWindow">
              <div class="title">监控车辆信息</div>
              <div class="info">
              <p>
                  车牌号:
                  <span>${row.cph}</span>
                </p>
                <p>
                  车型:
                  <span>${row.cx}</span>
                </p>
                <p>
                  车辆所有人:
                  <span>${row.clsyr}</span>
                </p>
                <p>
                  车辆标识:
                  <span>${row.vindjh}</span>
                </p>
                <p>
                  经度:
                  <span>${row.jd}</span>
                </p>
                <p>
                  纬度:
                  <span>${row.wd}</span>
                </p>

              </div>
            </div>`;

        var popup = L.popup()
        .setLatLng([lat, lng])
        .setContent(doms)
        .openOn(this.map);

      },
      /* *************************************************************************** */
      getData() {
        let Params = {
          dateStart: this.luJianDate ? formatDateToStr(this.luJianDate[0]) : '',
          dateEnd: this.luJianDate ? formatDateToStr(this.luJianDate[1]) : '',
          pageIndex: this.queryInfo.pagenum,
          pageSize: this.queryInfo.pagesize,
        };
        // 右侧列表
        this.$ajax(url.getList, Params).then((res) => {
          // console.log(res);
          this.tableData = res.data.list;
          this.queryInfo.total = res.data.total;
          this.getposi();
        });
        /*// 柱状图
        this.$ajax(url.getPfbz, {dateStart: formatDateToStr(this.luJianDate[0]),
          dateEnd: formatDateToStr(this.luJianDate[1]),}).then((res) => {
          if (res.success) {
            this.barOptions_status.xAxis.data = res.data.map((v) => v.pfjd);
            this.barOptions_status.series[0].data = res.data.map((v) => v.jxs);
            // this.barOptions_status.series[1].data = res.data.map(v => v.bhgs);
            // this.barOptions_status.series[2].data = res.data.map(v => v.wjcs);
          }
        });*/
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
        // this.initMap();
      }
    },
  };
</script>

<style lang="less" scoped>
  .page {
    /*padding-bottom: 60px;*/
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    #map {
      height: calc(100vh - 160px);
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
      margin-top: 15px;
      width: 100%;
      overflow: auto;
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
    /*overflow:visible !important;*/
  }
  .tableWrap {
    height: calc(100vh - 240px);
    /*overflow: auto;*/
  }
</style>

<!--
<template>
  <div class="page">
    <map-c />
    &lt;!&ndash; <div class="map" id="amap-box">
      <el-amap vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" :events="events">

        <el-amap-marker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker.position"
          :events="marker.events"
        ></el-amap-marker>

        <el-amap-info-window
          v-if="window"
          :position="window.position"
          :visible="window.visible"
          :content="window.content"
          :offset="window.offset"
          :close-when-click-map="true"
          :is-custom="true"
        >
          <div class="infoWindow">
            <div class="title">{{dialogInfo.carNum}}</div>
            <div class="info">
              <p>
                车辆标识:
                <span>{{dialogInfo.carNum}}</span>
              </p>
              <p>
                采集时间:
                <span>{{dialogInfo.creatTime}}</span>
              </p>
              <p>
                定位状态:
                <span>{{dialogInfo.dwzt}}</span>
              </p>
              <p>
                大气压力:
                <span>{{dialogInfo.dqyl}}</span>
              </p>
              <p>
                发动机冷却液温度:
                <span>{{dialogInfo.lqwd}}</span>
              </p>
              <p>
                发动机燃料流量:
                <span>{{dialogInfo.traffic}}</span>
              </p>
            </div>

          </div>
        </el-amap-info-window>
      </el-amap>
    </div> &ndash;&gt;

    <div class="right">
      <div class="right-time">
        <el-date-picker
          v-model="luJianDate"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" @click="getData">查询</el-button>
      </div>

      <div class="tableWrap">
        <el-table
          :data="tableData"
          :cell-style="cellStyle"
          show-summary
          border
          stripe
          height="100%"
        >
          <el-table-column prop="cphm" label="车牌号"></el-table-column>
          <el-table-column prop="noxndq" label="NOx浓度"></el-table-column>
          <el-table-column prop="klwndq" label="颗粒物浓度"></el-table-column>
          &lt;!&ndash;<el-table-column  prop="date" label="操作" width="50">
            <template slot-scope="scope">
              <el-button @click="toDetail(scope.row)" type="text">详情</el-button>
            </template>
          </el-table-column>&ndash;&gt;
        </el-table>
      </div>
      <el-pagination
        v-if="queryInfo.total"
        background
        layout="total, prev, pager, next"
        :total="queryInfo.total"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import url from "@/servers/url-config.js";
import { formatDateToStr } from "@/utility/utility.js";
import mapC from "./component/mapC";
export default {
  components: {
    mapC,
  },
  data() {
    let self = this;
    return {
      data: [
        // {
        //   position: "113.645422, 34.730936",
        // },
        // {
        //   position: "113.685313,34.746453",
        // },
        // {
        //   position: "113.686037,34.775838",
        // },
        // {
        //   position: "113.606037,34.795828",
        // },
      ],
      zoom: 10,
      center: [113.645422, 34.730936],
      markers: [],
      windows: [],
      window: "",
      events: {
        click(e) {
          const { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
        },
      },
      lng: 0,
      lat: 0,

      /*一些工具插件*/
      plugin: [
        {
          pName: "DistrictSearch",
          events: {
            init(o) {
              console.log(o);
            },
          },
        },
        {
          // 定位
          pName: "Geolocation",
          events: {
            init(o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng;
                  // 设置维度
                  self.lat = result.position.lat;
                  // 设置坐标
                  self.center = [self.lng, self.lat];
                  self.markers.push([self.lng, self.lat]);
                  // load
                  self.loaded = true;
                  // 页面渲染好后
                  self.$nextTick();
                }
              });
            },
          },
        },
        {
          // 工具栏
          pName: "ToolBar",
          events: {
            init(instance) {
              // console.log(instance);
            },
          },
        },
        {
          // 鹰眼(暂时没用到)
          pName: "OverView",
          events: {
            init(instance) {
              // console.log(instance);
            },
          },
        },
        {
          // defaultType地图类型
          pName: "MapType",
          defaultType: 0,
          events: {
            init(instance) {
              // console.log(instance);
            },
          },
        },
      ],

      luJianDate: [new Date(), new Date()],
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 10,
        total: 0,
      },
      dialogInfo: {},

      tableData: [],
    };
  },
  mounted() {},
  created() {
    this.getData();

    // let lujianLuchaParams = {
    //   startDate: formatDateToStr(this.luJianDate[0]),
    //   endDate: formatDateToStr(this.luJianDate[1]),
    //   pageNum: 1,
    //   pageSize: 2,
    // };
    // // 右边列表
    // this.$ajax(url.queryListByOBD, lujianLuchaParams).then((res) => {
    //   // console.log(res);
    //   this.tableData = res.data;
    // });
    // // 坐标
    // this.$ajax(url.queryListByOBD, lujianLuchaParams).then((res) => {
    //   console.log(res.data);
    //   this.data = res.data
    // });
  },

  methods: {
    getData() {
      let lujianLuchaParams = {
        startDate: this.luJianDate ? formatDateToStr(this.luJianDate[0]) : "",
        endDate: this.luJianDate ? formatDateToStr(this.luJianDate[1]) : "",
        pageNum: this.queryInfo.pagenum,
        pageSize: this.queryInfo.pagesize,
      };

      this.$ajax(url.queryListByOBD, lujianLuchaParams).then((res) => {
        // console.log(res);
        this.tableData = res.list;
        this.queryInfo.total = res.total;
      });
    },

    /* 以下内容无用******************************************************getdialog */
    getdialog() {
      this.$ajax(url.queryListByOBD, {}).then((res) => {
        console.log(res);
        res.data.forEach((item) => {
          this.dialogInfo = item;
        });
      });
    },
    point(arr) {
      const markers1 = [];
      const windows = [];

      const that = this;
      arr.forEach((item, index) => {
        // let poson = `${item.longitude},${item.latitude}`
        /* 标记点 */
        markers1.push({
          position: [item.longitude, item.latitude],

          // icon:item.url, //不设置默认蓝色水滴
          events: {
            click() {
              console.log(3333333333);
              that.getdialog();

              // 方法：鼠标移动到点标记上，显示相应窗体
              that.windows.forEach((window) => {
                window.visible = false; // 关闭窗体
              });
              that.window = that.windows[index];
              that.$nextTick(() => {
                that.window.visible = true;
              });
            },
          },
        });
        /* 窗体 */
        windows.push({
          position: [item.longitude, item.latitude],
          isCustom: true,
          offset: [115, 55], // 窗体偏移
          showShadow: false,
          visible: false, // 初始是否显示
          // address: item.address,
        });
      });

      //  加点
      // console.log(markers1,windows, '999999999999')
      this.markers = markers1;

      // 加弹窗
      this.windows = windows;
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
    // 表体字体颜色设置
    /***
     * row为某一行的除操作外的全部数据
     * column为某一列的属性
     * rowIndex为某一行（从0开始数起）
     * columnIndex为某一列（从0开始数起）
     */
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (row.iscb === "Y") {
        return "color: #EA1B29";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  // height: 100%;
  display: flex;

  .infoWindow {
    // margin-left: 30px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;

    .title {
      width: 100%;
      height: 24px;
      color: #fff;
      background-color: #1a73e8;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
    }
    .info {
      margin: 0 auto;
      padding: 10px;
    }
  }
  .right {
    width: 26%;
    font-size: 14px;
    position: relative;
    /deep/ .el-table__footer-wrapper{
      position: fixed;
    }
    .right-time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        padding-left: 8px;
        padding-right: 8px;
        /*margin-left: 10px;*/
      }
    }
    .tableWrap {
      height: calc(100vh - 283px);
      /*overflow: auto;*/
    }
  }
  .el-pagination {
    /* float: right; */
    margin-top: 50px;
    // bottom: 10px;
    // right: 0;
    // position: absolute;
  }
}
</style>
-->
