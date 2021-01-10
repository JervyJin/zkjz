
<template>
  <div id="map"></div>
</template>


<script>
import '@supermap/iclient-leaflet'
import 'leaflet/dist/leaflet'
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import url from "@/servers/url-config.js";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default {
  data() {
    return {
        data:[],
        dialogInfo:{},
        map: null
    };
  },
  methods: {
    initMap() {
      let vectorLayer = L.supermap.tiledMapLayer(url.mapApi + "/map-zzmap/rest/maps/basemap", {
        maxZoom: 20,
        minZoom: 8,
        tileSize: 256,
        zoomOffset: 1
      });

      let map = L.map('map',{
        minZoom: 8,
        maxZoom:19,
        crs:L.CRS.EPSG4326,
        layers: [vectorLayer]
      }).setView([34.730936,113.645422], 8);

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
    getposi(){
      let m = this.map;
      this.$ajax(url.queryListByjiance, {}).then((res) => {
        // var m = L.map("map").setView([34.730936, 113.645422], 12);
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
        // ).addTo(m);


        var group = L.layerGroup().addTo(m);

        res.data.forEach((item, index) =>{
          var lat = item.latitude;
          var lng = item.longitude;
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

          this.$ajax(url.queryListByjiancejigouId, {id:item.id}).then((res) => {
            // console.log(res);
            let dialogInfo = res.data;
            var doms = `<div class="infoWindow">
              <div style="font-size:14px;text-align: center;">${dialogInfo.name}</div>
              <div class="info">
                <p>
                  区域:
                  <span>${dialogInfo.areaCode}</span>
                </p>
                <p>
                  机构名称:
                  <span>${dialogInfo.name}</span>
                </p>
                <p>
                  机构地址:
                  <span>${dialogInfo.address}</span>
                </p>
                <p>
                  联系人:
                  <span>${dialogInfo.legal}</span>
                </p>
                <p>
                  联系人电话:
                  <span>${dialogInfo.telphone}</span>
                </p>
              </div>
            </div>`
            marker.bindPopup(doms);
          });
        })

      })
    }
  },
  mounted() {
    this.initMap();
  },
};
</script>
<style  scoped>
#map {
  width: 73%;
  height: 600px;
}
</style>
