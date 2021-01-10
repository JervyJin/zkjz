
<template>
  <div id="map">

    <div class="pie-graph" v-show="isShowChart">
      <div class="charts">
        <vChart class="chart" :options="pieOptions" auto-resize />
      </div>
    </div>
    <div class="line-graph" v-show="isShowChart">
      <div class="charts">
        <!-- <vChart class="chart" :options="lineOptions" /> -->
      </div>
    </div>
  </div>
</template>


<script>
import '@supermap/iclient-leaflet'
import 'leaflet/dist/leaflet'
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import url from "@/servers/url-config.js";
import {formatDateToStr} from '@/utility/utility.js';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default {
  props: ['startAndEndDate', 'remoteTableData', 'selectRow'],
  data() {
    return {
      data: [],
      dialogInfo: {},
      map: null,
      isShowChart: false,
      group: null,

      pieOptions: {
        // grid: {
        //   width:"400px",
        //   height: "300px",
        // },
        color: [
          "#7FB8FF",
          "#60A8FF",
          "#8FACFF",
          "#7197FF",
          "#60A8FF",
          "#9CC8FF",
          "#8FACFF",
          "#ACC1FF",
          "#49ACFF",
          "#68BAFF",
        ],
        title: {
          text: "点位总气体值",
          left: "left",
          top: '10',
          textStyle: {
            fontSize: 10,
            color: "#333333",
            fontStyle: "normal",
            fontWeight: 700,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "气体值",
            type: "pie",
            radius: "45%",
            center: ["50%", "50%"],
            data: [
              // {value: 20, name: '一氧化碳'},{value: 50, name: '一氧化碳'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },

      lineOptions: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        title: {
          text: "点位天气曲线图",
          left: "left",
          top: '10',
          textStyle: {
            fontSize: 10,
            color: "#333333",
            fontStyle: "normal",
            fontWeight: "bold",
          },
        },
        grid: {
          top: '18%',
          bottom: '30%',
          // right: '5%',
          // left: '10%'
          x: 50,
        },
        tooltip: {},
        legend: {
          data: ["温度", "湿度", "风速", "大气压"],
          bottom: "5%",
        },
        xAxis: {
          type: "category",
          data: ["00", "02", "04", "06", "08", "10", "12", "14"],
        },
        yAxis: {
          // name: '合格率(%)',
          // nameLocation: 'middle',
          type: "value",
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "温度",
            type: "line",
            stack: "总量",
            data: [140, 432, 641, 854, 970, 830, 810],
          },
          {
            name: "湿度",
            type: "line",
            stack: "总量",
            data: [130, 482, 791, 834, 590, 930, 710],
          },
          {
            name: "风速",
            type: "line",
            stack: "总量",
            data: [120, 232, 391, 854, 590, 730, 410],
          },
          {
            name: "大气压",
            type: "line",
            stack: "总量",
            data: [100, 300, 438, 800, 590, 678, 200],
          },
        ],
      },
    };
  },
  watch: {
    // 获取到坐标点
    remoteTableData: {
      immediate: true,
      deep: true,
      handler(v) {
        if(v.length) {
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
      handler(v) {
        if(v.jzid) {
          this.selectRowHandle(v);
        }
      }
    },
  },
  methods: {
    initMap() {
      let vectorLayer = L.supermap.tiledMapLayer(
        url.mapApi + "/map-mongodb-zzmap4490/rest/maps/zzmap4490",
        {
          maxZoom: 20,
          minZoom: 8,
          tileSize: 256,
          zoomOffset: 1,
        }
      );

      let map = L.map("map", {
        minZoom: 8,
        maxZoom: 19,
        crs: L.CRS.EPSG4326,
        layers: [vectorLayer],
      }).setView([34.730936, 113.645422], 10);

      let param = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
          name: "xzqh@xzqh",
          attributeFilter: "GB=410100",
        },
        datasetNames: ["xzqh:xzqh"],
      });
      L.supermap
        .featureService(url.mapApi + "/data-zzmap/rest/data")
        .getFeaturesBySQL(param, function (serviceResult) {
          let resultLayer = L.geoJSON(serviceResult.result.features,{
            style: function (feature) {
              return {color: '#03B180',weight:1,fillOpacity:0.1};
            }}).addTo(map)
            // .bindPopup("SMID = 247");
        });

      this.map = map;

      // this.getposi();
    },

    openCharts(obj) {
      // todo 这个接口对应的数据库的数据量太大，有风险，先注释
      /*this.$ajax(url.totalByQiti, obj).then(res => {
        // console.log(res,2222)
        if(res.success) {
          if(res.data.length) {
            let data = res.data.map((item) => {
              return {value: item.value, name: item.name};
            });
            this.pieOptions.series[0].data = data;
            this.isShowChart = true;
          }
        }
      });*/
    },

    getposi() {
      let m = this.map;
      let _this = this;
      // this.$ajax(url.queryListByDetection, {}).then((res) => {
      this.group = this.group ? this.group : L.layerGroup().addTo(m);
      let group = this.group;
      this.group.clearLayers(); // 清除现存所有markers
        // var group = L.layerGroup().addTo(m);
        _this.remoteTableData.forEach((item, index) => {
        // res.data.forEach((item, index) => {
          var lat = item.jzddwd ||'';
          var lng = item.jzddjd ||'';
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

          marker.unbindPopup();

          var doms = `<div class="infoWindow">
              <div style="font-size:14px;text-align: center;"></div>
              <div class="info">
                <p>
                  点位编号:
                  <span>${item.jzbh}</span>
                </p>
                <p>
                  点位名称:
                  <span>${item.jzmc}</span>
                </p>
                <p>
                  点位类型:
                  <span>${item.jzlxmc}</span>
                </p>
                <p>
                  点位状态:
                  <span>${item.jzwxztmc}</span>
                </p>
                <p>
                  经度:
                  <span>${item.jzddjd}</span>
                </p>
                <p>
                  纬度:
                  <span>${item.jzddwd}</span>
                </p>
                <p>
                  启用状态:
                  <span>${item.jzztmc}</span>
                </p>
              </div>
            </div>`;
          marker.bindPopup(doms);

          marker.on('click', function(e) {
            _this.openCharts({
              jzid: item.jzid,
              dateStart: _this.startAndEndDate.length ? formatDateToStr(_this.startAndEndDate[0]).slice(0, 10) : '',
              dateEnd: _this.startAndEndDate.length ? formatDateToStr(_this.startAndEndDate[1]).slice(0, 10) : '',
            });
          })
        });
      // });
    },
    // 选中table某一行地图交互
    selectRowHandle(row) {
      let lat = row.jzddwd || '';
      let lng = row.jzddjd || '';
      let blueIcon = L.icon({
        iconUrl: icon,
        iconSize: [25, 41],
        iconAnchor: [13, 21],
      });
      var doms = `<div class="infoWindow">
        <div style="font-size:14px;text-align: center;"></div>
        <div class="info">
          <p>
            点位编号:
            <span>${row.jzbh}</span>
          </p>
          <p>
            点位名称:
            <span>${row.jzmc}</span>
          </p>
          <p>
            点位类型:
            <span>${row.jzlxmc}</span>
          </p>
          <p>
            点位状态:
            <span>${row.jzwxztmc}</span>
          </p>
          <p>
            经度:
            <span>${row.jzddjd}</span>
          </p>
          <p>
            纬度:
            <span>${row.jzddwd}</span>
          </p>
          <p>
            启用状态:
            <span>${row.jzztmc}</span>
          </p>
        </div>
      </div>`;

      var popup = L.popup()
      .setLatLng([lat, lng])
      .setContent(doms)
      .openOn(this.map);

    },

  },
  mounted() {
    this.initMap();
    // this.openCharts({
    //   dateStart: this.startAndEndDate.length ? formatDateToStr(this.startAndEndDate[0]).slice(0, 10) : '',
    //   dateEnd: this.startAndEndDate.length ? formatDateToStr(this.startAndEndDate[1]).slice(0, 10) : '',
    // });
  },
};
</script>
<style  scoped lang="less">
#map {
  width: 73%;
  /* height: 100vh; */

}
.pie-graph {
  width: 240px;
  height: 200px;
  margin-top: 100px;
  margin-left: 10px;
  .chart {
    width: 240px;
    height: 200px;
  }
}
.line-graph {
  width: 240px;
  height: 240px;
  margin-top: 20px;
  .chart {
    width: 240px;
    height: 240px;
  }
}
.chart{
  z-index: 10000;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, .6);
}
</style>
