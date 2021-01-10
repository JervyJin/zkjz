<template>
  <div class="page">

    <div class="right">
      <div class="map">
        <el-amap
          class="amap-box"
          :amap-manager="map.amapManager"
          :vid="'amap-vue'"
          :zoom="map.zoom"
          :plugin="map.plugin"
          :center="map.center"
          :events="map.events"
        ></el-amap>
        <div class="searchBox">
          <div>
            <el-input v-model="input" placeholder="按公司编码、名称、地址查询"></el-input>
            <el-button type="primary">查询</el-button>
          </div>
          <div>
            <el-button type="primary">全部</el-button>
            <el-button>二七区</el-button>
            <el-button>管城区</el-button>
            <el-button>巩义市</el-button>
            <el-button>中原区</el-button>
            <el-button>惠济区</el-button>
          </div>
          <div>
            <el-button type="primary">全部</el-button>
            <el-button>垂直式</el-button>
            <el-button>水平式</el-button>
            <el-button>移动式</el-button>
          </div>
          <div>
            <el-button type="primary">全部</el-button>
            <el-button>在线</el-button>
            <el-button>离线</el-button>
            <el-button>异常</el-button>
          </div>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          stripe
        >
          <el-table-column prop="name" label="站点名称"></el-table-column>
          <el-table-column prop="number" label="号牌号码"></el-table-column>
          <el-table-column prop="date" label="检测时间"></el-table-column>
          <el-table-column prop="result" label="判定结果">
            <template slot-scope="scope">
              {{scope.row.result == 1 ? '合格' : '不合格'}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          layout="total, sizes, prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
export default {
  data() {
    let self = this
    return {
      input: '',
      map: {
        amapManager: new AMapManager(),
        address: null,
        searchKey: '',
        markers: [
          [113.645422, 34.730936],
          [113.685313,34.746453],
          [113.628106,34.748236],
          [113.686037,34.775838],
          [113.298282,34.808689]
        ],
        lng: 0,
        lat: 0,
        center: [113.645422, 34.730936], // '南京市',113.645422,34.730936
        zoom: 10,
        events: {
          init () {
            lazyAMapApiLoaderInstance.load().then(() => {
              self.initSearch()
            })
          },
          // 点击获取地址的数据
          click (e) {
            // console.log(e)
            self.map.markers = []
            let { lng, lat } = e.lnglat
            self.map.lng = lng
            self.map.lat = lat
            self.map.center = [lng, lat]
            self.map.markers.push([lng, lat])
            // 这里通过高德 SDK 完成。
            let geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: 'all'
            })
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  console.log(result.regeocode.formattedAddress)
                  self.map.address = result.regeocode.formattedAddress
                  self.map.searchKey = result.regeocode.formattedAddress
                  self.$nextTick()
                }
              }
            })
          }
        }
      },
      // 一些工具插件
      plugin: [
        {
          pName: 'DistrictSearch',
          events: {
            init (o) {
              console.log('...')
            }
          }
        },
        {
          // 定位
          pName: 'Geolocation',
          events: {
            init (o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng
                  // 设置维度
                  self.lat = result.position.lat
                  // 设置坐标
                  self.center = [self.lng, self.lat]
                  self.markers.push([self.lng, self.lat])
                  // load
                  self.loaded = true
                  // 页面渲染好后
                  self.$nextTick()
                }
              })
            }
          }
        },
        {
          // 工具栏
          pName: 'ToolBar',
          events: {
            init (instance) {
              // console.log(instance);
            }
          }
        },
        {
          // 鹰眼
          pName: 'OverView',
          events: {
            init (instance) {
              // console.log(instance);
            }
          }
        },
        {
          // 地图类型
          pName: 'MapType',
          defaultType: 0,
          events: {
            init (instance) {
              // console.log(instance);
            }
          }
        },
        {
          // 搜索
          pName: 'PlaceSearch',
          events: {
            init (instance) {
              // console.log(instance)
            }
          }
        }
      ],
      tableData: [
        { name: "监测站点01", number: "豫A89855", date: "2019-6-15", result: 0 },
        { name: "监测站点02", number: "豫A89855", date: "2019-6-15", result: 1 },
        { name: "监测站点03", number: "豫A89855", date: "2019-6-15", result: 0 },
        { name: "监测站点04", number: "豫A89855", date: "2019-6-15", result: 1 }
      ],
    }
  },
  methods: {
    initSearch () {
      let vm = this
      let map = this.map.amapManager.getMap()
      new AMap.DistrictSearch({
        extensions:'all',
        subdistrict:0
      }).search('郑州市',function(status,result){
        // 外多边形坐标数组和内多边形坐标数组
        var holes = result.districtList[0].boundaries
        if (holes) {
          let polygons = [];
          for (var i = 0, l = holes.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              strokeWeight: 2,
              path: holes[i],
              fillOpacity: 0.2,
              fillColor: '#ccc',
              strokeColor: 'blue'
            });
            polygons.push(polygon);
          }
          map.add(polygons)
          map.setFitView(polygons);//视口自适应
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .page {
    height: 100%;
    .right{
      display: flex;
      width: 100%;
      height: 100%;
      padding-top: 20px;
      .map{
        width: 80%;
        // width: 1319px;
        height: 970px;
        position: relative;
        .searchBox{
          padding: 15px 15px 20px;
          background: #fff;
          position: absolute;
          top: 0;
          left: 0;
          >div{
            width: 368px;
            white-space: wrap;
            .el-input{
              width: 75%;
            }
            .el-button+.el-button{
              margin-left: 0;
              margin-top: 15px;
            }
          }
        }
      }
      .table{
        width: 20%;
        // width: 348px;
        height: 100%;
        /deep/ .el-table th{
          background: #1890FF;
          color: #fff;
        }
      }
    }
  }
</style>