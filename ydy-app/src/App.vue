<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
import url from '@/service/url-config.js';
// import { setAuth } from './utility/auth';

export default {
  created() {
    // 鉴权
    dd.ready(() => {
      dd.getAuthCode({}).then(res => {
        if (res.code) {
          this.$http.post(url.getUserInfo, {"code": res.code}).then(res => {
            console.log(res, '免登成功')
            if(res.code == 200) {
              let userinfo = res.data.content.data;
            }
          })
        }
      })
      this.$http.post(url.getJsapiToken, {}).then(res => {
        if(res.success) {
          let accessToken = res.data;
          
          dd.authConfig({
            ticket: accessToken,
            jsApiList: ["startRecordAudio","stopRecordAudio", "playAudio", "pauseAudio", "downloadAudio"]
          }).then(res => {
            console.log(res, 'api调用成功')
            // alert(JSON.stringify(res))
          }).catch(err =>{
            console.log(err, 'api调用失败')
          })
        }
      })
    });
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 17px;
  /deep/.van-field__control--custom{padding: 5px 0;}
}

</style>
