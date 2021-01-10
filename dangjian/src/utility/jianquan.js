import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
import http from '../service/http';
import config from '../service/config'

let ticket
let signInfo
function getjianquan() {
    http.post("partyindex/getJSAPI", {}).then(res => {
      console.log(res,'获取鉴权');
      ticket = res.data.ticket;
      qianming();
    });
  }

  function qianming() {
    // const jsUrl = window.location.protocol + "//" + window.location.host + "/";
    const jsUrl = window.location.href.split('#')[0]
    // alert('sign url: '+jsUrl)
    http.post("partyindex/sign", {
        url: jsUrl,
        ticket: ticket
      })
      .then(res => {
        console.log(res,'获取签名');
        signInfo = res;
        jianquan();
      });
  }

  function jianquan() {
    let _this = this;
    dd.ready(() => {
      dd.config({
        agentId: config.appId, // 必填，微应用ID
        corpId: config.corpId, //必填，企业ID
        timeStamp: signInfo.timeStamp, // 必填，生成签名的时间戳
        nonceStr: signInfo.nonceStr, // 必填，生成签名的随机串
        signature: signInfo.signature, // 必填，签名
        type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: ['runtime.info','biz.contact.choose','biz.contact.complexPicker','biz.contact.departmentsPicker'] // 必填，需要使用的jsapi列表，注意：不要带dd。
      });
    });
  }

  export {
    getjianquan
  }