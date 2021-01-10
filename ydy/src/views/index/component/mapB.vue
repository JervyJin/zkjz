
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
  props: ['tableData', 'selectRow'],
  data() {
    return {
        data:[],
        dialogInfo:{},
        map: null,
      group: null,
    };
  },
  watch: {
    // 获取到坐标点
    tableData: {
      immediate: true,
      deep: true,
      handler (v) {
        if (v.length) {
          this.$nextTick(() => {
            this.getposi();
          })
        }
      }
    },
    // 获取到某一行
    selectRow: {
      immediate: true,
      deep: true,
      handler (v) {
        if (v.id) {
          this.selectRowHandle(v);
        }
      }
    },
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
          // .bindPopup('SMID = 247');
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

      // this.getposi();
    },
    // 选中table某一行地图交互
    selectRowHandle (row) {
      let lat = row.wd || '';
      let lng = row.jd || '';
      let blueIcon = L.icon({
        iconUrl: icon,
        iconSize: [25, 41],
        iconAnchor: [13, 21],
      });
      var doms = `<div class="infoWindow">
        <div style="font-size:14px;text-align: center;">${row.jcjgou}</div>
              <div class="info">
                <p>
                  机构名称:
                  <span>${row.jcjgou}</span>
                </p>
                <p>
                  机构地址:
                  <span>${row.lxdz}</span>
                </p>
                <p>
                  联系人:
                  <span>${row.lxr}</span>
                </p>
                <p>
                  联系人电话:
                  <span>${row.lxdh}</span>
                </p>
              </div>
      </div>`;

      var popup = L.popup()
        .setLatLng([lat, lng])
        .setContent(doms)
        .openOn(this.map);

    },
    getposi(){
      let m = this.map;
      let _this = this;
      let mockData = [
        {address: '河南省郑州市金水区顺河路2号', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.766965, legal: '翟书豪',
          longitude: 113.703128, name: '河南天茂机动车检测有限公司', superviseCate: '1', tel: '(0371)61653628', telphone: '18738788653'},
        {address: '河南省郑州市惠济区北四环中州大道交叉口', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.887038, legal: '张朋立',
          longitude: 113.69602, name: '河南安吉车享家机动车检测有限公司', superviseCate: '1', tel: '(0371)61653628', telphone: '15138764534'},
        {address: '河南省郑州市荥阳市', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.778163, legal: '李俊龙',
          longitude: 113.328528, name: '蓝天机动车检测有限公司', superviseCate: '1', tel: '(0371)61653628', telphone: '18838783497'},
        {address: '河南省郑州市金水区三全路美之上', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.837161, legal: '侯石杰',
          longitude: 113.64454, name: '郑州速兴机动车检测有限公司', superviseCate: '1', tel: '(0371)61653628', telphone: '17835986736'},
        {address: '河南省郑州市管城回族区陇海里', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.737725, legal: '王翠',
          longitude: 113.679897, name: '河南金星啤酒厂金星机动车检测中心', superviseCate: '1', tel: '(0371)61653628', telphone: '18738788653'},
        {address: '河南省郑州市中牟县大孟镇', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.814826, legal: '李建伟',
          longitude: 114.039625, name: '郑州市鼎泰机动车检测有限公司', superviseCate: '1', tel: '(0371)61653628', telphone: '18789456790'},
        {address: '河南省郑州市中牟县', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.595549, legal: '刘海涛',
          longitude: 113.973524, name: '河南恒通机动车检测中心', superviseCate: '1', tel: '(0371)61653628', telphone: '18878964392'},
        {address: '郑州市二七区工业路', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.720823, legal: '张俊豪',
          longitude: 113.533786, name: '河南佳鑫机动车检测有限公司', superviseCate: '1', tel: '(0371)61653628', telphone: '16689350825'},
        {address: '科学大道北50米', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.813934, legal: '韩永耀',
          longitude: 113.560078, name: '郑州大承汽车检测有限公司', superviseCate: '1', tel: '(0371)61653628', telphone: '13853421711'},
        {address: '河南省郑州市惠济区新城街道', areaCode: '1', cate: '1', code: '1', id: '1', industryCate: '1', latitude: 34.893486, legal: '张振强',
          longitude: 113.617798, name: '郑州大正机动车检测站', superviseCate: '1', tel: '(0371)61653628', telphone: '17848925661'}
      ]
      /*mockData.forEach((item, i) => {
        _this.tableData[i].jd = item.longitude;
        _this.tableData[i].wd = item.latitude;
      });*/
      this.group = this.group ? this.group : L.layerGroup().addTo(m);
      let group = this.group;
      this.group.clearLayers(); // 清除现存所有markers
      // var group = L.layerGroup().addTo(m);

      _this.tableData.forEach((item, index) =>{
        var lat = item.wd;
        var lng = item.jd;
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

        // this.$ajax(url.queryListByjiancejigouId, {id:item.id}).then((res) => {
        // console.log(res);
        let dialogInfo = item;
        var doms = `<div class="infoWindow">
              <div style="background: #2F7FE3;color: #fff;font-size:14px;text-align: center;">${dialogInfo.jcjgou}</div>
              <div class="info">
                <p>
                  机构名称:
                  <span>${dialogInfo.jcjgou}</span>
                </p>
                <p>
                  机构地址:
                  <span>${dialogInfo.lxdz}</span>
                </p>
                <p>
                  联系人:
                  <span>${dialogInfo.lxr}</span>
                </p>
                <p>
                  联系人电话:
                  <span>${dialogInfo.lxdh}</span>
                </p>
              </div>
            </div>`
        marker.bindPopup(doms);
        // });
      })
      // this.$ajax(url.queryListByjiance, {}).then((res) => {
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
      // })
    }
  },
  mounted() {
    this.initMap();
  },
};
</script>
<style  scoped>
#map {
  width: 76.4%;
  /* height: 100vh; */
}
</style>
