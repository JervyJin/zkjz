<template>
  <div id="mapDiv" style="height: 100%; width: 100%"></div>
</template>

<script>
import L from 'leaflet'
import '@supermap/iclient-leaflet';
import icon from "leaflet/dist/images/marker-icon.png";
import url from "@/servers/url-config.js";

export default {
  props: {
    MapPoint: {
      type: Array,
      default:[]
    }
  },
  data() {
    return {
      map: null
    }
  },
  mounted() {
    let vectorLayer = L.supermap.tiledMapLayer(url.mapApi + "/map-mongodb-zzmap4490/rest/maps/zzmap4490", {
      maxZoom: 20,
      minZoom: 8,
      tileSize: 256,
      zoomOffset: 1,
    });

    let map = L.map('mapDiv',{
      minZoom: 8,
      maxZoom:19,
      crs:L.CRS.EPSG4326,
      layers: [vectorLayer]
    }).setView([34.730936,113.645422], 9); 

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
            return {color: '#03B180',weight:1,fillOpacity:0.1};
          }}).addTo(map)
        //.bindPopup('SMID = 247');
      });

    this.map = map;
  },
  watch: {
    MapPoint(arr) {
    //   console.log(arr,'arr')
      
        let blueIcon = L.icon({
          iconUrl: icon,
          iconSize: [25, 41],
          iconAnchor: [13, 21],
        });
        let group = L.layerGroup().addTo(this.map);
        arr.forEach(v => {
          var lat = v.wd;
          var lng = v.jd;
          // let point = v.latlng.reverse();
          let mk = L.marker([lat, lng], {icon: blueIcon}).addTo(group);
          // marker.on('click', function(e) {
            // if(this.isOpen)
            let popupContent = `<div class="infoWindow">
              <div class="title">检测站信息</div>
              <div class="info">
                <p>
                  检测站名称：
                  <span>${v.jczmc}</span>
                </p>
                <p>
                  检测站状态：
                  <span>${v.jczzt}</span>
                </p>
                <p>
                  检测站类型：
                  <span>${v.jczlx}</span>
                </p>
              </div>           
            </div>`
            mk.bindPopup(popupContent);
            // this.isOpen=true;
          // })
          // .addTo(map);
        })
    }
  }
}
</script>

<style lang="less" scoped>
  #mapDiv {
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

     /deep/.leaflet-container .leaflet-control-attribution {
    font-size: 11px;
    height: 0;
}
    
  }
   /deep/.leaflet-container .leaflet-control-attribution {
    font-size: 11px;
    height: 0;
}
 
</style>