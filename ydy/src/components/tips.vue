<template>
  <div class="container">
    <div class="content">
      <div class="text">公告保存成功!</div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  .container{
    z-index: 1000000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100Vh;
    background: rgba(0, 0, 0, .6);
    .content {
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      width: 300px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>