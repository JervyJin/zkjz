
function isEmpty (value, callback, n, message, key = '') {
  if (!value.toString().trim().length || value.toString().trim().length >= n) { // 空字符
    callback(message)
  } else {
    callback()
  }
}
const moneyFor = (rule, value, callback) => {
  let exp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (value === '' || value === 0) {
    callback('请填写申请金额') // eslint-disable-line
  } else if (!exp.test(value) || value.toString().length >= 10 || value.toString().length < 1) {
    callback('请输入10位以内的数字(包含两位小数)') // eslint-disable-line
  } else {
    callback()
  }
}

function formatMoney (value, callback, n, message) {
  let exp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (value === '' || value === 0) {
    callback(message) // eslint-disable-line
  } else if (!exp.test(value) || value.toString().length > n || value.toString().length < 1) {
    callback('请输入10位以内的数字(包含两位小数)') // eslint-disable-line
  } else {
    callback()
  }
}
function limitMoney (n, message) {
  return function (rule, value, callback) {
    formatMoney(value, callback, n, message)
  }
}

function limitLength (n, meg, key) {
  return function (rule, value, callback) {
    isEmpty(value, callback, n, meg, key)
  }
}

let validQuarterly = (rule, value, callbackMth) => {
  var rg = /^([0-4])$/
  if (rg.test(value)) {
    callbackMth()
  } else {
    callbackMth('请输入正确的季度：1,2,3,4')
  }
}
let validYear = (rule, value, callbackMth) => {
  var rg2 = /(19[\d][\d]|20[\d][\d])/
  if (rg2.test(value)) {
    callbackMth()
  } else {
    callbackMth('请输入正确的年度')
  }
}
let validMonth = (rule, value, callbackMth) => {
  var rg1 = /^([0-9]|(1[0-2]))$/
  if (rg1.test(value)) {
    callbackMth()
  } else {
    callbackMth('请输入正确的月份：1,2,3...11,12')
  }
}
let validEmptySpace = (rule, value, callback) => {
  if (value.replace(/\s*/g, '').length === 0) {
    callback(new Error('内容不能为空'));
  } else {
    callback();
  }
};
let validYouBian = (rule, value, callback) => {
  var rg1 = /^[1-9][0-9]{5}$/
  if (rg1.test(value)) {
    callback()
  } else {
    callback(new Error('邮编格式不正确'))
  }
};
let validPhone = (rule, value, callback) => {
  var rg1 = /^1[3456789]\d{9}$/
  if (rg1.test(value)) {
    callback()
  } else {
    callback(new Error('电话不存在'))
  }
};
let validIdCard = (rule, value, callback) => {
  var rg1 = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
  if (!value || rg1.test(value)) {
    callback()
  } else {
    callback(new Error('身份证号不存在'))
  }
};
let validNoHanZi = (rule, value, callback) => {
  if (/[\u4E00-\u9FA5]/g.test(value)) {
    callback(new Error('不能输入汉字'))
  } else {
    callback()
  }
};

export {
  limitMoney,
  limitLength,
  formatMoney,
  moneyFor,
  validQuarterly,
  validYear,
  validMonth,
  validEmptySpace,
  validYouBian,
  validPhone,
  validIdCard,
  validNoHanZi
}
