<template>
  <div id="mapDiv" style="height: 100%; width: 100%"></div>
  <!-- <sm-web-map :map-options="mapOptions"></sm-web-map> -->
</template>

<script>
import L from 'leaflet'
import '@supermap/iclient-leaflet';
import 'leaflet/dist/leaflet.css'
// import '@supermap/iclient-leaflet'
// import 'leaflet/dist/leaflet'
import './leaflet-heat.js';
import iconRed from "@/assets/image/red.png";
import iconYellow from "@/assets/image/yellow.png";
import iconBlue from "@/assets/image/blue.png";
import url from "@/servers/url-config.js";
export default {
  // props: ['allPoints', 'type', 'cameraId', 'currentMap'],
  props: {
    allPoints: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: 1
    },
    cameraId: {
      type: String,
      default: ''
    },
    currentMap: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      map: null,
      group: null,
      iconRed,
      iconYellow,
      iconBlue,
      heatMapLayer: null
    }
  },
  mounted() {
    this.initMap();
  },
  watch: {
    allPoints() {
      if(this.currentMap == 2) {
        if(this.map) {
          this.group && this.group.clearLayers(); // 清除现存所有markers
          this.loadHeatMap(this.map, this.allPoints);
        }
      }
      if(this.currentMap == 1) {
        this.heatMapLayer && this.map.removeLayer(this.heatMapLayer)
        this.loadPoint(this.allPoints);
      }
    },
    currentMap: {
      immediate: true,
      handler(v, o) {
        if(v == o) return;
        if(v == 2) {
          if(this.map) {
            this.group && this.group.clearLayers(); // 清除现存所有markers
            this.loadHeatMap(this.map, this.allPoints);
          }
        }
        if(v == 1) {
          this.$nextTick(() => {
            this.heatMapLayer && this.map.removeLayer(this.heatMapLayer)
            this.loadPoint(this.allPoints);
          })
        }
      }
    }
  },
  methods: {
    initMap() {
      let vectorLayer = L.supermap.tiledMapLayer(url.mapApi + "/map-mongodb-zzmap4490/rest/maps/zzmap4490", {
        maxZoom: 20,
        minZoom: 8,
        tileSize: 256,
        zoomOffset: 1
      });

      // let scale = this.type == 1 ? 12 : 8;
      let map = L.map('mapDiv',{
        minZoom: 8,
        maxZoom:19,
        crs:L.CRS.EPSG4326,
        layers: [vectorLayer]
      }).setView([34.730936,113.645422], 12);

      // map.on('load', function() {
      let param = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
          name: "xzqh@xzqh",
          attributeFilter: "GB=410100"
        },
        datasetNames: ["xzqh:xzqh"]
      })
      L.supermap
        .featureService(url.mapApi + "/data-zzmap/rest/data")
        .getFeaturesBySQL(param, function (serviceResult) {
          let resultLayer = L.geoJSON(serviceResult.result.features,{
            style: function (feature) {
              return {
                color: '#03B180',
                weight:1,
                fillOpacity:0.1
              };
            }}).addTo(map)
          // .bindPopup('SMID = 247');
        });

      this.map = map;

      // 添加marker
      // var points=[34.76329, 113.680032]
      // var marker = L.marker(points, {'title': 'hahah'}).on('click', function(e) {
      //   if(this.isOpen) return;
      //   var popupContent=`
      //       <div class="container">
      //         <h3>河南省中科九州科技有限公司</h3>
      //         <table>
      //           <tr>
      //             <td>名称</td>
      //             <td>地址</td>
      //           </tr>
      //           <tr>
      //             <td>测试</td>
      //             <td>二七区</td>
      //           </tr>
      //         </table>
      //       </div>
      //   `
      //   console.log(this)
      //   this.bindPopup(popupContent).openPopup();
      //   this.isOpen=true;
      // }).addTo(map);

    // })
    this.$nextTick()
    },
    loadPoint() {
      let arr = this.allPoints;
      if(!arr.length) return;
      let iconRed = L.icon({
        iconUrl: this.iconRed,
        iconSize: [25, 25],
        iconAnchor: [13, 21],
      });
      let iconYellow = L.icon({
        iconUrl: this.iconYellow,
        iconSize: [25, 25],
        iconAnchor: [13, 21],
      });
      let iconBlue = L.icon({
        iconUrl: this.iconBlue,
        iconSize: [25, 25],
        iconAnchor: [13, 21],
      });
      this.group = this.group ? this.group : L.layerGroup().addTo(this.map);
      if(!this.cameraId) {
        this.group.clearLayers(); // 清除现存所有markers
      }

      let group = this.group;

      let _this = this;
      arr.forEach(v => {
        let point = v.point.split(',');
        // let point = [34.730936, 113.645422];
        let val = _this.type == 1 ? v.pollutantWeight : v.smogCount;
        let icon = val > 10000 ? iconRed : val > 1000 ? iconYellow : iconBlue;
        let mk = L.marker(point, {icon: icon}).addTo(group);

        if(_this.type == 1) {  // 尾气
          let doms = `<div class="infoWindow">
            <div class="title">监控信息</div>
              <div class="info">
                <p>
                  所在街道:
                  <span>${v.streetName}</span>
                </p>
                <p>
                  所有车辆每公里排放PM污染物重量之和:
                  <span>${v.pollutantWeight}</span>
                </p>
              </div>
            </div>`
          if(!this.cameraId) {  // 未选中某一个摄像头
            mk.bindPopup(doms);  // 只绑定弹窗
          } else {
            mk.bindPopup(doms).openPopup(); // 直接展示弹窗
          }
        }
        if(_this.type == 2) {  // 黑烟
          // mk.on('click', function(e) { // 黑烟点击摄像头回显图片
          //   _this.$emit('clickPoint', v.cameraId);
          // })
          let doms = `<div class="infoWindow">
            <div class="title">监控信息</div>
              <div class="info">
                <p>
                  经度:
                  <span>${v.point.split(',')[0]}</span>
                
                </p>
                <p>
                  纬度:
                  
                  <span>${v.point.split(',')[1]}</span>
                </p>
                <p>
                  黑烟个数:
                  <span>${v.smogCount}</span>
                </p>
              </div>
            </div>`
          if(!this.cameraId) {  // 未选中某一个摄像头
            mk.bindPopup(doms);  // 只绑定弹窗
          } else {
            mk.bindPopup(doms).openPopup(); // 直接展示弹窗
          }
        }
      })
    },
    loadHeatMap(map, arr) {
      // let heatNumbers = 150;
      let heatRadius = 25;
      // let num = parseInt(heatNumbers);
      // num = (num > 0) ? num : 0;
      let radius = parseInt(heatRadius);
      radius = (radius > 0) ? radius : 0;
      // var heatPoints = [];
      // for (var i = 0; i < num; i++) {
      //     heatPoints[i] = [Math.random() * 0.28 + 34.76329, Math.random() * 0.5 + 113.680032, Math.random() * 80];
      // }
      let heatPoints = arr.map(v => {
        return [...v.point.split(','), v.pollutantWeight]
      })
      this.heatMapLayer = L.heatLayer(heatPoints, {
        radius: radius,
        minOpacity: 0.5,
        // gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
      });
      this.heatMapLayer.addTo(map);

    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
