/**
 * 接口统一管理
 * @url 请求地址
 * @method 请求方式
 * @data post请求参数
 * @query get请求参数
 * **/
import request from '@/service/http'

// export function getList(query) {
//     return request({
//       url: '/xxx/table/list',
//       method: 'get',
//       params:query
//     })
//   }
/* 图片上传 */
// export function uploadFile(data) {
//     return request({
        
//         url: '/system/file/uploadFile',
//         method: 'post',
//         data,
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     })
// }
/*新增任务分派*/ 
export function getEnforcenum(data) {
    return request({
        url: '/api/task/getEnforcenum',
        method: 'post',
        data
    })
}