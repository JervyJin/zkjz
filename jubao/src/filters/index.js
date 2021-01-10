import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
console.log(dayjs())
const filters = {
  /**
   * 功能：将时间戳按照给定的 时间/日期 格式进行处理
   * @param {Number} date 时间戳
   * @returns {String} 规范后的 时间/日期 字符串
   */
  formatDate: function (date) {
    if (!date) {
      return '---';
    }
    return dayjs(date).format('YYYY-MM-DD dddd'); // 使用 dayjs 格式化时间
  },
  
  fmtTime(date) {
    if (dayjs().diff(dayjs(date), 'minutes') > 1) {
      return dayjs(date).fromNow()
    }
    return dayjs(date).format('YYYY-MM-DD HH:mm') // 使用 dayjs 格式化时间
  }
}
export default Vue => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
