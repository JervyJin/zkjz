<template>
  <div id="app">
    <div class="topBar" v-if="!$route.meta.hideNav">
      <top-nav class="topNav"/>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import urlConfig from './servers/url-config';
import topNav from './components/topNav';

export default {
  name: 'App',
  components: {
    topNav
  },
  data () {
    return {
      loading: null
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  watch: {
    isLoading(v) {  // 进入页面loading
      return;
      if(!v) {
        this.loading.close();
      } else {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }
    }
  },
  created () {
  //   let id_token = sessionStorage.getItem('id_token');
  //   this.$ajax(urlConfig.login, {id_token}).then(res => {
  //   // alert(sessionStorage.getItem('currentUser'))
  //     console.log(res, 'login')
  //     if(!res.success || !res.body.menu.length) {
  //       this.$router.push('/error');
  //       return;
  //     }
  //     this.$store.commit('set_username', res.body.user || {})
  //     this.$store.commit('setMenus', res.body.menu || [])
  //     sessionStorage.setItem('user', JSON.stringify(res.body.user))
  //     sessionStorage.setItem('menus', JSON.stringify(res.body.menu))
  //     console.log(this.$store.state.menus.menus, 'menus')
  //     // sessionStorage.setItem('userName', res.body.user.userName);
  //   })
  },
  beforeDestroy () {

  },
  methods: {

  }
}
</script>
<style lang='less'>
  @import './assets/style/mixin.less';
  body, html {
    height: 100vh;
    overflow: hidden;
    width: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .topBar {
      width: 100%;
      height: 68px;
      line-height: 68px;
      background: @green;
      // background-image: linear-gradient(90deg, #07B7D7 0%, #5BC044 100%);
      color: #fff;
      .topNav {
        /*width: 1180px;
        margin: 0 auto;*/
        background-image: url('./assets/image/bg.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }
    }
    .view {
      /*width: 1180px;
      margin: 0 auto;*/
      overflow: hidden;
      height: calc(100% - 68px);
    }
  }
</style>
