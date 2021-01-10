<template>
  <div class="page">
    <div id="mapDiv" style="height:800px;width: 100%"></div>
    <!-- <sm-web-map :map-options="mapOptions"></sm-web-map> -->
  </div>
</template>

<script>
export default {
  data() {
    var host = window.isLocal ? window.server : "http://106.13.169.216:8090";
    var attribution = "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox </a>" +
    " with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a> | </span>" +
    " Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> ";

    return {
      mapOptions: {
        serverUrl: 'http://106.13.169.216:8090/iserver/services/map-zzmap/rest/maps/basemap',
        container: 'map', // container id
        style: {
          "version": 8,
          "sources": {
            "raster-tiles": {
              "attribution": attribution,
              "type": "raster",
              "tiles": [host +
                '/iserver/services/map-china400/rest/maps/China/zxyTileImage.png?z={z}&x={x}&y={y}'
              ],
              "tileSize": 256
            }
          },
          "layers": [{
            "id": "simple-tiles",
            "type": "raster",
            "source": "raster-tiles",
            "minzoom": 0,
            "maxzoom": 22
          }]
        },
        center: [120.143, 30.236], // starting position
        zoom: 3 // starting zoom
      }
    }
  },
  mounted() {
    // var url ="https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
    // // 初始化地图信息
    // var map = L.map('map', {
    //     crs: L.CRS.NonEarthCRS({
    //         bounds: L.bounds([48.4, -7668.25],[8958.85, -55.58]),
    //         origin: L.point(48.4,-55.58)
    //     }),
    //     center: [-4500, 4000],
    //     maxZoom: 18,
    //     zoom: 1
    // });
    // // 添加图层
    // L.supermap.tiledMapLayer(url, {noWrap: true}).addTo(map);

    let vectorLayer = L.supermap.tiledMapLayer("http://117.159.25.210:8094/iserver/services/map-zzmap/rest/maps/basemap", {
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
     }).setView([34.730936,113.645422], 12); 

     map.on('load', function() {
       let param = new SuperMap.GetFeaturesBySQLParameters({
         queryParameter: {
            name: "xzqh@xzqh",
            attributeFilter: "SMID>0"
        },
        datasetNames: ["xzqh:xzqh"]
       })
       L.supermap
         .featureService("http://117.159.25.210:8094/iserver/services/data-zzmap/rest/data")
         .getFeaturesBySQL(sqlParam, function (serviceResult) {
           let resultLayer = L.geoJSON(serviceResult.result.features,{
            style: function (feature) {
              return {color: '#03B180',weight:1,fillOpacity:0.1};
            }}).addTo(map)
          //  .bindPopup('SMID = 247');
         });
     })
  }
}
</script>

<style lang="less" scoped>
  .page{
    width: 100%;
    height: 800px;
  }
</style>