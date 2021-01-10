// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import vueResource from 'vue-resource'
import router from './router'
// import echarts from 'echarts'
// import 'lib-flexible/flexible'
import './assets/style/public.less'
// 引入iconfont
import "../static/icon/iconfont.css"

// 引入store
import store from "./store/index.js"

import ajax from './servers/ajax'
import urlConfig from './servers/url-config.js'
import ECharts from 'vue-echarts'
import {formateMoney, formateBtnList, setSession, getSession} from '@/utility/utility'

import VueAMap from 'vue-amap'

// 超图
// import L from 'leaflet';
// import '@supermap/iclient-leaflet';
// import '@supermap/iclient-leaflet/dist/iclient-leaflet.min.css';
import 'leaflet/dist/leaflet.css'
/*import '@supermap/iclient-leaflet'
import 'leaflet/dist/leaflet'*/
import Print from './utility/print'
// import VueiClient from '@supermap/vue-iclient-mapboxgl';
// Vue.use(VueiClient);

Vue.use(VueAMap);
Vue.use(Print);
VueAMap.initAMapApiLoader({
  key: 'd7918df5144f6581c70b3e99bbc94da5',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.DistrictSearch', 'AMap.Heatmap'],
  v: '1.4.4',
  uiVersion: '1.0'
})

// 加载框架组件
Vue.use(vueResource)
Vue.use(ElementUI, {size: 'mini'})
Vue.config.productionTip = false

// 注册全局的组件
Vue.component('vChart', ECharts)
// 过滤金钱的格式
Vue.filter('formateNum', formateMoney)

// 页面使用 this.$ajax(url, data, type).then(res) 默认请求方式为post
Vue.prototype.$ajax = ajax
Vue.prototype.setSession = setSession
Vue.prototype.getSession = getSession
Vue.prototype.formateBtnList = formateBtnList
// Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


function getUrlParam(name) {
  var temp = window.location.href.split('?')[1];
  var pram = new URLSearchParams('?'+temp);
  return pram.get(name);
}


let id_token = sessionStorage.getItem('id_token') || getUrlParam('id_token') || '111';
// let userid = JSON.parse(sessionStorage.getItem('user')).id || 'aaa';
let userid = '';
if (sessionStorage.getItem('user')) {
  userid = JSON.parse(sessionStorage.getItem('user')).id;
}

if(id_token) {
  app.$store.commit('setIsLoading', 1)
  console.log(id_token, 'id_token')
  Vue.http.interceptors.push((request,next)=>{
    //request.credentials = true; // 接口每次请求会跨域携带cookie
    //request.method= 'POST'; // 请求方式（get,post）
    request.headers.set('id_token', id_token) // 请求headers携带参数
    request.headers.set('userid', userid) // 请求headers携带参数

    next(function(response){
     return response;

    });
   })
  sessionStorage.setItem('id_token', id_token);
  Vue.http.post(urlConfig.login, {id_token}).then(res => {
    console.log(res)
    if(res.body.code != 200) {
      // app.$store.commit('setIsLoading', 0)
      // app.$router.push('/error');
      return;
    }
    app.$store.commit('setIsLoading', 0)
    app.$store.commit('set_username', res.body.user || {})
    app.$store.commit('setMenus', res.body.menu || [])
    sessionStorage.setItem('user', JSON.stringify(res.body.user))
    sessionStorage.setItem('menus', JSON.stringify(res.body.menu))
    userid = JSON.parse(sessionStorage.getItem('user')).id || '';
  }).catch(res => {
    // app.$store.commit('setIsLoading', 0)
    // app.$router.push('/error');
  })
}


router.beforeEach((to, from, next) => {
  if (to.meta.withoutAuth) {  // login及用户页面无需权限直接跳转
    next()
  } else {  // 有权限
    // let id_token = getUrlParam('id_token') || '';
    // let id_token = sessionStorage.getItem('id_token') || '';
    // alert(id_token)
    // console.log(id_token, 'id_token', '000000000000000')
    // if(id_token) {
    //   id_token && sessionStorage.setItem('id_token', id_token);
    // }
    // next()
    if(id_token) {
      next()
    } else {
      next({
        path: '/error'
      })
    }
  }
})
