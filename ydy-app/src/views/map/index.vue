<template>
  <baidu-map
    :center="center"
    :zoom="zoom"
    :dragging="true"
    :scroll-wheel-zoom="true"
    class="map"
    @ready="handler"
    @click="getClickInfo"
    @moving="syncCenterAndZoom"
    @moveend="syncCenterAndZoom"
    @zoomend="syncCenterAndZoom"
  >
    <!-- //地理位置的搜索功能 -->
    <bm-local-search
      :keyword="keyword"
      :auto-viewport="true"
      :location="location"
    ></bm-local-search>
    <!-- //缩放比例尺的展示 -->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <!-- //定位 -->
    <bm-geolocation
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      :showAddressBar="true"
      :autoLocation="true"
    ></bm-geolocation>
    <!-- //添加一个小红点的，并将当前的经纬度写入数据中 -->
    <bm-marker :position="{ lng: center.lng, lat: center.lat }"></bm-marker>
  </baidu-map>
</template>

<script>
import url from "@/service/url-config.js";
export default {
  data() {
    return {
      //百度地图初始化数据
      baidumapSwitch: false,
      center: { lng: 113.666532, lat: 34.75319 },
      zoom: 10,
      location: "郑州市",
      keyword: "请输入搜索关键词"
    };
  },

  methods: {
    //百度地图初始化（这个一定要！否则地图回加载不出来）
    handler({ BMap, map }) {},
    //点击获取到当前经纬度
    getClickInfo(e) {
      console.log(e.point.lng);
      console.log(e.point.lat);
      this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;
    },
    //双向绑定经纬度以及缩放尺寸
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      // this.zoom = e.target.getZoom();
    },
    //经纬度同步
    baidumap() {
      this.baiduDevicelocationx = this.center.lng;
      this.baiduDevicelocationy = this.center.lat;
    }
  }
};
</script>
<style scoped>
.map{
  width: 100%;
  height: 100vh;
}
</style>

