
import Vue from 'vue'
import ElementUI from 'element-ui'
/**
 *
 *
 * @export
 * @param {any} url 请求的地址
 * @param {any} data 请求的数据
 * @param {string} [type='POST'] 请求的方式  默认为post
 * @returns 返回值是promise
 */

// const id_token =  sessionStorage.getItem('id_token');
export default function (url, data, type = 'POST', isCSB=0) {
  return new Promise((resolve, reject) => {
    let ajax;

    // Vue.http.headers.common['id_token'] = id_token;

    if (type === '' || type === 'POST') {
      // 去除参数中的错值
      if (typeof data === 'object') {
        Object.keys(data).forEach(key => {
          // if(data[key] === 'undefind' || data[key] === null || data[key] === '') {
          //   delete data[key]
          // }
          // data[key] = (data[key] === 'undefind' || data[key] === null) ? '' : data[key]
        })
      }
      let config = isCSB == 1 ? {
        emulateJSON: false,
        'headers': {
        'Content-Type': 'application/json'
        },
        
    } : {emulateJSON: true,withCredentials: true}
      ajax = Vue.http.post(url, data, config)
    }

    // get请求
    if (type && type.toUpperCase() === 'GET') {
      let value = '?'
      Object.keys(data).forEach(key => {
        if (data[key] === 'undefind' || data[key] == null || data[key] === '') return
        value += (key + '=' + data[key] + '&')
      })
      url = url + value.substring(0, value.length - 1)
      ajax = Vue.http.get(url, {emulateJSON: true})
    }

    ajax.then((res) => {
      if (res.ok && res.body.msg === '页面已过期，请重新登录!') {
        ElementUI.Message({
          message: '页面已过期，请重新登录!',
          type: 'warning'
        })
        localStorage.removeItem('user')
        location.href = location.pathname + '#/login?redirect=%2F' + location.hash.replace(/#/, '').replace(/\//g, '%2F')
      }
      if (res.ok && !res.body.success && res.body.message && /.*[\u4e00-\u9fa5]+.*$/.test(res.body.msg)) {
        ElementUI.Message({
          message: res.body.message,
          duration: 2000,
          type: 'warning'
        })
      }
      resolve(res.body)
    }).catch(err => {
      ElementUI.Message({
        message: '请求出错!' + (err.body.message ? err.body.message : ''),
        type: 'error'
      })
      reject(err)
    })
  })
}
