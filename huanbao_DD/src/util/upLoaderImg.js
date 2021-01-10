//upLoaderImg.js
import axios from 'axios' //引入axios
import urlApi from '../config'
import {
    Toast
} from 'vant' //引入Toast

const dicts = {
    0: 'DBZ', //逮捕证
    1: 'DCQZQTFJ', //调查取证其他附件
    2: 'DCZJBG', //调查终结报告
    3: 'KCBLFJ', //勘察笔录附件
    4: 'XSJLZ', //刑事拘留证
    5: 'XSPJS', //刑事判决书
    6: 'XWBLFJ', // 询问笔录附件
    7: 'XZCFJDS', //行政处罚决定书
    8: 'XZJLJDS', // 行政拘留决定书
    9: 'ZXFXFJ' // 自行发现附件
}

let userinfos = JSON.parse(window.localStorage.getItem("userinfo"));

//用于生成uuid
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

function upLoaderImg(files, type, uuid) { //file为 你读取成功的回调文件信息
    //new 一个FormData格式的参数
    let params = new FormData()
    if (files instanceof Array && files.length) { // 判断是否是多图上传 多图则循环添加进去
        files.forEach(item => {
            params.append("files", item.file)//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        })
    } else {
        params.append("files", files.file)
    }
    // params.append('file', file)
    params.append("userid", userinfos.userId);
    params.append("uuid", uuid);
    params.append("type", dicts[type]);
    // params.append("comid", comid);


    let config = {
        headers: { //添加请求头
            'Content-Type': 'multipart/form-data'
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(urlApi.api_base + "/uploadFiles", params, config).then( res=>{
          resolve(res.data.data)
        })
      })

}

// 删除图片
function delImg(id) { //file为 你读取成功的回调文件信息
    //new 一个FormData格式的参数
    let str = JSON.stringify({fileid:id})
    return new Promise((resolve, reject) => {
        axios.post(config.api_base,str).then( res=>{
          resolve(res.msg)
        })
    })

}

export {
    guid,
    upLoaderImg,
    delImg
}