import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "lib-flexible/flexible";
import VueAMap from "vue-amap";
import ECharts from 'vue-echarts';

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'SnNEoLld1yGa06hqLBYKrsMmeOhDxGv7'
})



import http from './service/http';

import {
  DropdownMenu,
  DropdownItem,
  NoticeBar,
  NavBar,
  Uploader,
  ActionSheet,
  Cell,
  CellGroup,
  Icon,
  Image,
  Radio,
  DatetimePicker,
  Row,
  Col,
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Step,
  Steps,
  CheckboxGroup,
  Checkbox,
  Rate,
  PullRefresh,
  Divider,
  Collapse,
  CollapseItem,
  List,
  Popup,
  Search,
  NumberKeyboard,
  Dialog,
  RadioGroup,
  Tag,
  Calendar,
  Grid, GridItem,
  Popover
} from 'vant';
import 'vant/lib/index.css';
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(NoticeBar);
Vue.use(Uploader);
Vue.use(ActionSheet);
Vue.use(DatetimePicker);
Vue.use(Icon);
Vue.use(Image);
Vue.use(Cell);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(CellGroup);
Vue.use(Form);
Vue.use(Field);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Step);
Vue.use(Steps);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Rate);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Popup);
Vue.use(Search);
Vue.use(NumberKeyboard);
Vue.use(Dialog);
Vue.use(NavBar);
Vue.use(Row);
Vue.use(Col);
Vue.use(Divider);
Vue.use(Tag);
Vue.use(Calendar);
Vue.use(VueAMap);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Popover);

// 注册全局的组件
Vue.component('vChart', ECharts)

VueAMap.initAMapApiLoader({
  // key: "09a4d90ae2506ceac698060c9598ee80",
  key: "a0eb69119261d4a079f78273ecedbbbb",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch", // POI搜索插件
    "AMap.Scale", // 右下角缩略图插件 比例尺
    "AMap.OverView",
    "AMap.ToolBar", // 地图工具条
    'AMap.MapType',
    "AMap.PolyEditor",
    "AMap.CircleEditor", // 圆形编辑器插件
    "AMap.Geolocation" // 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4",
  uiVersion: "1.0"
});

Vue.config.productionTip = false;

Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


