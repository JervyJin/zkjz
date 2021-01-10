<template>
  <div class="homePage">

    <div class="users">
      <van-image round width="30px" height="30px" :src="userinfo.avatar" v-if="userinfo.avatar"/>
      <span class="avatar" v-else>{{userinfo.userName && userinfo.userName.substring(userinfo.userName.length-2)}}</span>
      <div class="username">您好，{{userinfo.userName}}</div>
    </div>

    <van-grid :column-num="3" clickable>
      <van-grid-item to="zxFaxian">
        <van-image :src="require('@/assets/img/zhixing.png')" />
        <p class="text">自行发现</p>
      </van-grid-item>
      <van-grid-item to="paifa" v-if="isQx">
        <van-image :src="require('@/assets/img/paifa.png')" />
        <p class="text">领导派发</p>
      </van-grid-item>
      <van-grid-item to="daiban">
        <van-image :src="require('../assets/img/daiban.png')" />
        <p class="text">待办案件</p>
      </van-grid-item>
      <van-grid-item to="zhifaJilu">
        <van-image :src="require('@/assets/img/chaxun.png')" />
        <p class="text">案件查询</p>
      </van-grid-item>
      <van-grid-item to="tongJi">
        <van-image :src="require('@/assets/img/tongji.png')" />
        <p class="text">导出案件统计</p>
      </van-grid-item>
      <van-grid-item to="daochu">
        <van-image :src="require('@/assets/img/diaodu.png')" />
        <p class="text">导出案件调度</p>
      </van-grid-item>
      <van-grid-item url="http://222.143.24.250:8166/ill/index.html">
        <van-image :src="require('../assets/img/zixun.png')" />
        <p class="text">旧版入口</p>
      </van-grid-item>
    </van-grid>

  
  </div>
</template>

<script>
import config from '../config.js'
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
import { getjianquan } from "../util/jianquan";
export default {
  data() {
    return {
      code: "",
      corpId: config.corpId,
      userinfo:{},
      // appkey: "dingsjtrefsi9yoiiq8q",
      // appsecret:
      //   "q3u1dHxNOAu8TaV7Wmx59gn-JhaG9ITQN1nYgniGGXwLMNF7yTmCFnRKUyRCub2t",
      // access_token: "7d7f536ee34e3452a19c4c6e3727abb8"
      isQx: false
    };
  },

  methods: {
    // 获取微应用免登授权码
    getAccessLoginCode() {
      if (dd.env.platform !== "notInDingTalk") {
        let _this = this;
        dd.ready(() => {
          dd.runtime.permission.requestAuthCode({
            corpId: _this.corpId,
            onSuccess: function(result) {
              console.log(result)
              console.log("获取code成功:", JSON.stringify(result.code));
              _this.code = result.code;
              console.log(_this.code)

              _this.getUser();
            },
            onFail: function(err) {
              console.log("获取code失败:");
              alert(JSON.stringify(err));
            }
          });
        });
        dd.error(error => {
          alert(`error: corpId=${config.corpId},appId=${config.appId}`);
          alert(`dd error: ${JSON.stringify(error)}`);
        });
      }
    },

    /* 调用后台接口获取当前用户信息 */
    getUser(){
      this.http.post("getUser",{
        code:this.code
      })
      .then(res=>{
        console.log(res)
        this.userinfo = res;
        this.isQx = res.isQx;
        // 把获取到的用户信息储存到localStorage中
        window.localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
        getjianquan();
      })
    },




  },
  created() {
    this.getAccessLoginCode();

    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "首页" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.homePage {
  .users {
    display: flex;
    align-items: center;
    width: 90%;
    margin: auto;
    padding: 15px 20px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #e4e4e4;
    .username {
      font-size: 18px;
      margin-left: 10px;
    }
    .avatar{
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      background:#3296FA;
      color: #fff;
      font-size: 16px;
    }
  }
  // .menuList {
  //   display: flex;
  //   justify-content: space-around;
  //   margin-top: 10px;
  //   padding: 10px 0;
  //   background: #fff;
  //   font-size: 16px;
  //     .listItem {
  //       text-align: center;
  //       p {
  //         margin-top: 10px;
  //       }
  //     }

  // }
  .van-grid{margin-top: 10px;}
  .van-image{
    width: 65px;
    height: 65px;
  }
  
  .text {
    font-size: 16px;
    margin-top: 10px;
    color: #6f6d7f;
  }
}
</style>
