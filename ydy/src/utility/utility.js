
const formatDateToStr = function (timeDate) {
  let date
  if (typeof timeDate === 'string') {
    date = new Date(timeDate)
  } else if (typeof timeDate === 'object') {
    date = timeDate
  }
  if (date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = month > 9 ? month : '0' + month
    day = day > 9 ? day : '0' + day
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    h = h > 9 ? h : '0' + h
    m = m > 9 ? m : '0' + m
    s = s > 9 ? s : '0' + s
    return `${year}-${month}-${day} ${h}:${m}:${s}`
  }
  return ''
}

const formateMoney = function (s) {
  if (!s) return ''
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(2) + '' // eslint-disable-line
  var l = s.split('.')[0].split('').reverse()
  var r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}
// 全局过滤的金钱格式
const formatDateTimeToStr = function (timeDate) {
  let date
  if (typeof timeDate === 'string') {
    date = new Date(timeDate)
  } else if (typeof timeDate === 'object') {
    date = timeDate
  }
  if (date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = month > 9 ? month : '0' + month
    day = day > 9 ? day : '0' + day
    return `${year}-${month}-${day}`
  }
  return ''
}
/** 设置session */
const setSession = function (key, val) {
  let str = val instanceof Object ? JSON.stringify(val) : val
  sessionStorage[key] = str
}

/** 读取session */
const getSession = function (key) {
  try {
    return JSON.parse(sessionStorage[key])
  } catch (e) {
    console.warn('SessionStorage.Parse:', '[key:', key, ']', e.message)
    return sessionStorage[key]
  }
}

const formateBtnList = function (list, btnList) {
  let data = []
  list.forEach(btn => {
    btnList.forEach(item => {
      if (item.buttonId === btn.buttonId) {
        data.push(item)
      }
    })
  })
  return data
}

// 下载文件流
const downloadFile = function (formData, url, name) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true); // 也可以使用POST方式，根据接口
    xhr.responseType = "blob"; // 返回类型blob
    xhr.setRequestHeader("id_token", sessionStorage.getItem('id_token'));
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); //form data 类型，默认是payload 类型。
    // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
    xhr.onload = function () {
      // 请求完成
      if (this.status === 200) {
        // 返回200
        let res = xhr.response;
        alert(JSON.stringify(res))
        let url = window.URL.createObjectURL(new Blob([res],{type:"text/plain"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name)
    
        document.body.appendChild(link)
        link.click()

      }
    };
    // 发送ajax请求
    xhr.send(formData);
  })
};
export {
  setSession,
  getSession,
  formateMoney,
  formateBtnList,
  formatDateToStr,
  formatDateTimeToStr,
  downloadFile
}
