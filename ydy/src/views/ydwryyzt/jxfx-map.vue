<template>
  <div id="mapDiv" style="height: 100%; width: 100%"></div>
  <!-- <sm-web-map :map-options="mapOptions"></sm-web-map> -->
</template>

<script>
import L from 'leaflet'
import '@supermap/iclient-leaflet';
import url from "@/servers/url-config.js";

export default {
  mounted() {
    let vectorLayer = L.supermap.tiledMapLayer(url.mapApi + "/map-zzmap/rest/maps/basemap", {
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
    }).setView([34.730936,113.645422], 10); 
    return;
    // map.on('load', function() {
      let param = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
          name: "xzqh@xzqh",
          attributeFilter: "GB=410100"
        },
        datasetNames: ["xzqh:xzqh"]
      })
      L.supermap 
        .featureService(url.mapApi + "/map-mongodb-zzmap4490/rest/maps/zzmap4490")
        .getFeaturesBySQL(param, function (serviceResult) {
          let resultLayer = L.geoJSON(serviceResult.result.features,{
            style: function (feature) {
              return {color: '#03B180',weight:1,fillOpacity:0.1};
            }}).addTo(map)
          // .bindPopup('SMID = 247');
        });

      // 添加热力图
      // loadHeatMap();
      // function loadHeatMap() {
      //   var heatNumbers = 150, heatRadius = 30;
      //   var num = parseInt(heatNumbers);
      //   num = (num > 0) ? num : 0;
      //   var radius = parseInt(heatRadius);
      //   radius = (radius > 0) ? radius : 0;
      //   var heatPoints = [];
      //   for (var i = 0; i < num; i++) {
      //       heatPoints[i] = [Math.random() * 0.28 + 34.76329, Math.random() * 0.5 + 113.680032, Math.random() * 80];
      //   }
      //   resultLayer = L.heatLayer(heatPoints, {
      //       radius: radius,
      //       minOpacity: 0.5
      //   }).addTo(map);
      // }

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
  }
}
</script>

<style lang="less" scoped>
  
</style>