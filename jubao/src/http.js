import axios from 'axios'
import { getToken } from '@/util/token'
import qs from 'qs'
import config from './config'
import router from './router'
import Vue from 'vue'
console.log(config)

// 创建axios实例
const http = axios.create({
  baseURL: config.api_base,
  timeout: 15000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json',
  },
  transformRequest: [
    function(data, headers) {
      data = data || {}
      data = qs.stringify(data)
      return data
    }
  ]
})

// request拦截器
http.interceptors.request.use(config => {
  config.data = config.data ? config.data : {}
  // config.headers["authorization"] = store.state.token; //把token添加到请求头每次请求接口时候带上
  if (router.currentRoute && router.currentRoute.meta.requiresAuth) {
    if (getToken() === '') {
      return Promise.reject('请登录后操作')
    } else {
      return config
    }
  } else {
    return config
  }
})

// respone拦截器
http.interceptors.response.use(
  response => {
    let data = response.data

    let msg = data.message || ''
    if (data.code == 401) {
      // 账号禁用
      Vue.toasted.error(data.message, { icon: 'error' }).goAway(2000)
      router.replace({ name: 'login' })
      return Promise.reject(new Error(msg))
    } else if (data.code == 403) {
      // 登录失效 需重新登录
      Vue.toasted.error('登录失效 需重新登录', { icon: 'error' }).goAway(2000)
      router.replace({ name: 'login' })
      return Promise.reject(new Error(msg))
    } else if (data.code == 400) {
      return Promise.reject(new Error(msg))
    }
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
