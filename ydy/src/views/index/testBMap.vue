<template>
  <div class="pageIndex">
    <baidu-map class="map" ak="你的百度地图秘钥" :zoom="map.zoom" :center="{lng: map.center.lng, lat: map.center.lat}"
        @ready="handler" :scroll-wheel-zoom="true">
    </baidu-map>
    <div class="right">
      <table>
        <tr>
          <td v-for="v in title" :key="v">{{v}}</td>
        </tr>
        <template v-for="i in  11">
          <tr v-for="(v,index) in table" :key="index*i">
            <td v-for="k in v" :key="k">{{k}}</td>
            <td>详情</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>

// 百度地图
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmlHeatmap, BmBoundary } from 'vue-baidu-map' // 热力图

export default {
  data () {
    return {
      title: ['超标车辆信息', 'NOX浓度超标', '不透光度超标信息', '操作'],
      table: [{
        mark: '豫GE1X19',
        nox: '36.54',
        opa: '36.54'
      }],
      map: {
        center: {lng: 113.645422, lat: 34.730936}, // '南京市',113.645422,34.730936
        zoom: 11,
        width: '500px',
        height: '410px'
      }
    }
  },
  components: {
    BaiduMap,
    BmlHeatmap,
    BmBoundary
  },
  mounted () {

  },
  beforeDestroy () {

  },
  methods: {
    // 地图初始化
    handler ({BMap, map}) {
      // console.log(BMap, map)
      var bdary = new BMap.Boundary()
      bdary.get('郑州市', function (rs) {       // 获取行政区域
        map.clearOverlays()        // 清除地图覆盖物

        // for循环都删除掉了，只剩下这个
        // 网上查了下，东西经南北纬的范围
        var EN_JW = '180, 90;'         // 东北角
        var NW_JW = '-180,  90;'       // 西北角
        var WS_JW = '-180, -90;'       // 西南角
        var SE_JW = '180, -90;'        // 东南角
        // 4.添加环形遮罩层
        var ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW, { strokeColor: 'none', fillColor: '#fff', fillOpacity: 1, strokeOpacity: 0.5 }) // 建立多边形覆盖物

        map.addOverlay(ply1)
        // 5. 给目标行政区划添加边框，其实就是给目标行政区划添加一个没有填充物的遮罩层
        var ply = new BMap.Polygon(rs.boundaries[0], { strokeWeight: 2, strokeColor: '#00f', fillColor: '' })
        map.addOverlay(ply)
        // map.setViewport(ply.getPath());    //调整视野
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pageIndex {
  width: 100%;
  height: 100%;
  display: flex;
  .map{
    width: 76.4%;
    height: 100%;
    margin-top: 100px;
  }
  .right{
    width: 23.6%;
    height: 100%;
    font-size: 14px;
    border-left: 1px solid #F6F6F6;
    .title{
      background: #F6F6F6;
      height: 68px;
      line-height: 68px;
      color: #333333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      tr:nth-of-type(2n+1) {
        background: #F6F6F6;
        border: 1px solid #F6F6F6;
      }
      td {
        text-align: center;
        height: 54px;
      }

    }
    .charts{
      border-bottom: 1px solid #F6F6F6;
      width: 100%;
      .chart{
        width: 100%;
        height: 284px;
      }
    }
  }
}
</style>
