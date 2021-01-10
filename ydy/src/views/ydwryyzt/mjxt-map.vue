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
    points: {
      type: Array,
      default: []
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
      zoomOffset: 1
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
    points(arr) {
      // if(arr.length) {
        let blueIcon = L.icon({
          iconUrl: icon,
          iconSize: [25, 41],
          iconAnchor: [13, 21],
        });
        let group = L.layerGroup().addTo(this.map);
        arr.forEach(v => {
          let point = v.latlng.reverse();
          let mk = L.marker(point, {icon: blueIcon}).addTo(group);
          // marker.on('click', function(e) {
            // if(this.isOpen)
            let popupContent = `<div class="infoWindow">
              <div class="title">公司信息</div>
              <div class="info">
                <p>
                  公司名称：
                  <span>${v.companyName}</span>
                </p>`
            if(v.credietCode) {
              popupContent += `<p>
                  信用代码：
                  <span>${v.credietCode}</span>
                </p>`
            }
            if(v.industeyType) {
              popupContent += `<p>
                  行业类型：
                  <span>${v.industeyType}</span>
                </p>`
            }
                
                
               popupContent +=  `<p>
                  行政区划：
                  <span>${v.administrativeArea}</span>
                </p>
                <p>
                  地址：
                  <span>${v.address}</span>
                </p>
                <p>
                  东经：
                  <span>${v.lng}</span>
                </p>
                <p>
                  北纬：
                  <span>${v.lat}</span>
                </p>`
              if(v.legalPerson) {
                popupContent +=  `<p>
                  法人：
                  <span>${v.legalPerson}</span>
                </p>`
              }
                popupContent += ` <p>
                  联系人：
                  <span>${v.contacts}</span>
                </p>
                <p>
                  联系电话：
                  <span>${v.contactPhone}</span>
                </p>
                <p>
                  成立日期：
                  <span>${v.establishTime}</span>
                </p>
              </div>           
            </div>`
            mk.bindPopup(popupContent);
            // this.isOpen=true;
          // })
          // .addTo(map);
        })
      // }
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
      // 兼容deep在火狐浏览器问题
      .title {
        text-align: center;
        font-size: 14px;
        background: #2F7FE3;
        color: #fff;
      }
      .info {
        max-height: 300px;
        overflow: auto;
      }
    }
    
  }
</style>