<template>
  <div class="page">
    <map-b :tableData="tableData" :selectRow="selectRow"></map-b>
    <!-- <div class="map" id="amap-box">
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
            <div class="title">{{dialogInfo.name}}</div>
            <div class="info">
              <p>
                区域:
                <span>{{dialogInfo.areaCode}}</span>
              </p>
              <p>
                机构名称:
                <span>{{dialogInfo.name}}</span>
              </p>
              <p>
                机构地址:
                <span>{{dialogInfo.address}}</span>
              </p>
              <p>
                联系人:
                <span>{{dialogInfo.legal}}</span>
              </p>
              <p>
                联系人电话:
                <span>{{dialogInfo.telphone}}</span>
              </p>
              <p>
                统一社会信用代码:
                <span>119128938458998MA</span>
              </p>
            </div>

          </div>
        </el-amap-info-window>
      </el-amap>
    </div> -->

    <div class="right">
        <div class="right-time">
          <el-date-picker
            v-model="luJianDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="primary" @click="getTable">查询</el-button>
        </div>
      <div class="tableWrap">
        <el-table :data="tableData" border stripe show-summary  height="100%" @row-click="selectRowHandle">
          <el-table-column prop="jcjgou" show-overflow-tooltip label="机构名称"></el-table-column>
          <el-table-column prop="zs" label="车辆总数"></el-table-column>
          <el-table-column prop="btgs" label="不通过数"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="queryInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageIndex"
        :page-size="queryInfo.pageSize"
        v-if="queryInfo.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import url from "@/servers/url-config.js";
import { formatDateToStr } from "@/utility/utility.js";
import mapB from './component/mapB'

export default {
  components:{
    mapB,
  },
  data() {
    let self = this;
    return {
      data: [
        {
          longitude: 113.696571,
          latitude: 34.871361
        },
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
      center: [113.686037,34.775828],
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

      luJianDate: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)],
      queryInfo: {
        total: 0,
        // 当前页数
        pageIndex: 1,
        // 每页显示多少数据
        pageSize: 10,
      },

      tableData: [],
      selectRow: {},
      dialogInfo:{}
    };
  },
  mounted() {
    this.point();
  },
  created() {
    // 机动车检测机构坐标
    /*this.$ajax(url.queryListByjiance, {}).then((res) => {
      // console.log(res);
      this.data = res.data
    });*/
    this.getTable();
  },
  methods: {
    getTable () {
      let lujianLuchaParams = {
        startDate: this.luJianDate ? formatDateToStr(this.luJianDate[0]) : '',
        endDate: this.luJianDate ? formatDateToStr(this.luJianDate[1]) : '',
        pageNum: this.queryInfo.pageIndex,
        pageSize: this.queryInfo.pageSize
      };
      // 右边列表
      this.$ajax(url.queryJdcPfjgxx, lujianLuchaParams).then((res) => {
        this.tableData = res.data.list;
        /*this.tableData = [
          {id: '1', name: '河南天茂机动车检测有限公司', carNum: 4850, percent: '2%'},
          {id: '2', name: '河南安吉车享家机动车检测有限公司', carNum: 1753, percent: '3%'},
          {id: '3', name: '蓝天机动车检测有限公司', carNum: 1671, percent: '2%'},
          {id: '4', name: '郑州速兴机动车检测有限公司', carNum: 3725, percent: '4%'},
          {id: '5', name: '河南金星啤酒厂金星机动车检测中心', carNum: 3923, percent: '4%'},
          {id: '6', name: '郑州市鼎泰机动车检测有限公司', carNum: 1865, percent: '3%'},
          {id: '7', name: '河南恒通机动车检测中心', carNum: 1907, percent: '1%'},
          {id: '8', name: '河南佳鑫机动车检测有限公司', carNum: 2210, percent: '2%'},
          {id: '9', name: '郑州大承汽车检测有限公司', carNum: 1910, percent: '5%'},
          {id: '10', name: '郑州大正机动车检测站', carNum: 2078, percent: '3%'},
        ];*/
        this.queryInfo.total = res.data.total;
      });
    },
    point() {
      const markers = [];
      const windows = [];
      const that = this;

      let array = JSON.parse(JSON.stringify(this.data))
      array.forEach((item, index) => {

        let poson = `${item.longitude},${item.latitude}`
        /* 标记点 */
        markers.push({
          position: poson.split(","),

          // icon:item.url, //不设置默认蓝色水滴
          events: {
            click() {
            that.$ajax(url.queryListByjiancejigouId, {id:item.id}).then((res) => {
              that.dialogInfo = res.data
            });

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
          position: poson.split(","),
          isCustom: true,
          offset: [115, 55], // 窗体偏移
          showShadow: false,
          visible: false, // 初始是否显示
          address: item.address,
        });
      });
      //  加点
      this.markers = markers;
      // 加弹窗
      this.windows = windows;
    },

    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getTable();
    },
    // 选中table某一行地图交互
    selectRowHandle (row) {
      this.selectRow = row;
    },
    // 监听 页码值 改变事件
    handleCurrentChange(page) {
      this.queryInfo.pageIndex = page;
      this.getTable();
    },
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
    width: 76.4%;
    height: 1012px;
  }
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
    .el-pagination {
    /* float: right; */
      width: 100%;
      overflow: auto;
     margin-top: 55px;
    // bottom: 10px;
    // right: 0;
    // position: absolute;
    }
  }
}
</style>
