
<template>
  <div id="map"></div>
</template>


<script>
import '@supermap/iclient-leaflet'
import 'leaflet/dist/leaflet'
import L from "leaflet";
import iconRed from "@/assets/image/obd.png";
import iconBlue from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
import url from "@/servers/url-config.js";

export default {
  data() {
    return {
        data:[],
        dialogInfo:{},
        map: null,
        tableData: [

      ],
      iconRed,
      iconBlue
    };
  },
  methods: {
    initMap() {
      let vectorLayer = L.supermap.tiledMapLayer(url.mapApi + "/map-mongodb-zzmap4490/rest/maps/zzmap4490", {
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
      }).setView([34.730936,113.645422], 10);

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
      this.$ajax(url.queryOBDMapData, {}).then((res) => {
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

        console.log(res,'CCCCCC')


        var group = L.layerGroup().addTo(m);

        res.data.forEach((item, index) =>{
          var lat = item.wd;
          var lng = item.jd;
          var iconBlue = L.icon({
            iconUrl: this.iconBlue,
            iconSize: [25, 41],
            iconAnchor: [13, 21],
          });
          var iconRed = L.icon({
            iconUrl: this.iconRed,
            iconSize: [30, 43],
            iconAnchor: [13, 21],
          });

          let icon = item.iscb=='Y' ? iconRed : iconBlue

          var marker = L.marker([lat, lng], {
            icon: icon,
            // draggable:true,
            // riseOnHover:true
          }).addTo(group);
            // .bindPopup(doms);



            var doms = `<div class="infoWindow">
              <div style="font-size:14px;text-align: center;">${item.cphm}</div>
              <div class="info">
                <p>
                  车主:
                  <span>${item.cz}</span>
                </p>
                <p>
                  车辆标识:
                  <span>${item.vin}</span>
                </p>
                <p>
                  上报状态:
                  <span>${item.sbzt}</span>
                </p>
                <p>
                  经度:
                  <span>${item.jd}</span>
                </p>
                <p>
                  纬度:
                  <span>${item.wd}</span>
                </p>
                <p>
                  网络状态:
                  <span>${item.wlzt}</span>
                </p>
                <p>
                  NOx浓度:
                  <span>${item.noxndq}</span>
                </p>
              </div>
            </div>`
            marker.bindPopup(doms);

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
  /* height: 100vh; */
}
</style>
