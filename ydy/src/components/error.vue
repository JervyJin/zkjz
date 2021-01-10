<template>
  <div class="errorPage">
    <h4>wrong request,not found Username from id_token</h4>
    <a href="http://59.207.61.15:11121/xxhmh/sso/login">返回登录页面</a>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  .errorPage {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-image: url('~@/assets/image/wrong.png');
    background-repeat: no-repeat;
    background-size: 488px 366px;
    background-position: center 100px;
    text-align: center;
    padding-top: 600px;
    h4 {
      color: #04d298;
      font-size: 20px;
      margin-bottom: 50px;
    }
  }
</style>