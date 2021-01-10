<template>
  <div class="home">
    <div class="topbg"></div>
    <div class="userInfo">
      <van-icon
        name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
        size="30"
        style="vertical-align: middle;"
      />
      <!-- <span> 张三</span> -->
      <span v-if="userinfo.lastName"> {{ userinfo.lastName }}</span>
      <span v-if="userinfo.name"> {{ userinfo.name }}</span>
    </div>
    <div class="info">
      <div class="top top1">系统公告<span></span></div>
      <van-notice-bar
        color="#666"
        background="#fff"
        scrollable
        left-icon="volume-o"
      >
        关于延长2020年春节假期的通知
      </van-notice-bar>
    </div>

    <div class="top">移动源执法</div>
    <div class="container">
      <div
        class="list"
        v-for="(v, i) in lists"
        :key="i"
        @click="clickHandle(i)"
      >
        <img class="icon" :src="v.src" />
        <div class="text">
          {{ v.label }}
        </div>
      </div>
    </div>
    <!-- <footer-container></footer-container> -->
  </div>
</template>

<script src="https://g.alicdn.com/gdt/jsapi/1.3.2/index.js"></script>
<script>
// import hby from "@/components/hby/hby";
import url from "@/service/url-config.js";

export default {
  name: "Home",
  // components: {
  //   hby
  // },
  data() {
    return {
      lists: [
        { label: "执法任务", src: require("@/assets/img/icon1.png") },
        { label: "信息查询", src: require("@/assets/img/icon2.png") },
        { label: "统计分析", src: require("@/assets/img/icon4.png") },
        { label: "工作考核", src: require("@/assets/img/icon5.png") },
        { label: "个人信息", src: require("@/assets/img/icon6.png") }
        // { label: '地图导航', src: require('@/assets/img/icon3.png') },
      ],
      userinfo: {},
      code:"",
    };
  },
  methods: {
    clickHandle(i) {
      switch (i) {
        case 0:
          this.$router.push("/task");
          break;
        case 1:
          this.$router.push("/info");
          break;
        case 2:
          this.$router.push("/analyse");
          break;
        case 3:
          this.$router.push("/work");
          break;
        case 4:
          this.$router.push("/user");
          break;
        // case 5:
        // this.$router.push('/map');
        // break;
      }
    },
    // 获取免登授权码
    // getCode() {
    //   dd.getAuthCode({ corpId: "3" }).then(res => {
    //       // alert(JSON.stringify(res.code));
          
    //       if (res.code) {
    //       this.$http.post(url.getUserInfo, {"code": res.code}).then(res => {
    //         alert(JSON.stringify(res));
    //         if(res.code == 200) {
    //           this.userinfo = res.data.content.data;
    //           // sessionStorage.setItem('userinfo',JSON.stringify(res.data.content.data))
    //         }
    //       })
    //     }

    //   });
    // },
    // 获取登录用户信息
    getLoginUser(){
      dd.getLoginUser().then(res => {
          // alert(JSON.stringify(res))
          this.userinfo = res;
      }).catch(err => {})
    }
  },
  created() {
    // this.getCode();
    this.getLoginUser()
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  background: #f2f2f2;
  .topbg {
    height: 150px;
    background: url("../../assets/img/topbg.png") no-repeat;
    background-size: 100% 100%;
  }
  .userInfo {
    margin-top: 10px;
    background: #fff;
    padding: 10px;
  }
  .top {
    margin-top: 10px;
    text-align: left;
    background: #fff;
    font-size: 18px;
    color: #333333;
    padding: 16px 0 21px 17px;
  }
  .top1 {
    padding: 16px 0 16px 17px;
    font-weight: 600;
    span {
      float: right;
      padding-right: 16px;
      font-size: 15px;
      font-weight: 100;
      color: #666;
    }
  }
  .info {
    padding-bottom: 5px;
    background: #fff;
    .van-notice-bar {
      padding: 0 16px;
      // font-size: 14px;
      /deep/.van-icon-volume-o.van-notice-bar__left-icon {
        color: #28a1ff !important;
      }
    }
  }
  .container {
    background: #fff;
    display: flex;
    flex-wrap: wrap;
  }
  .container .list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 30px;
  }
  .container .list .icon {
    width: 38px;
  }
  .container .list .text {
    margin: 5px 0 23px;
    font-size: 14px;
    color: #333333;
    font-weight: 600;
  }
}
</style>
