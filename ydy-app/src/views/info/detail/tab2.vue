<template>
  <div class="page">
    <van-steps direction="vertical" :active="-1" active-color="#28A1FF">
      <van-step>
        <template #inactive-icon>
          <span class="icon">1</span>
        </template>
        <h3>任务办理<span>阿三</span></h3>
        <div class="info">
          <p><span class="span1">办理时间：</span><span class="span2">2020-03-20 14:43</span></p>
          <p><span class="span1">办理时长：</span><span class="span2">5分钟</span></p>
          <p><span class="span1">下一环节：</span><span class="span2">复核</span></p>
          <p><span class="span1">接收人：</span><span class="span2">李四(郑州市生态环境综合行政执法支队)</span></p>
        </div>
      </van-step>
      <van-step>
        <template #inactive-icon>
          <span class="icon">2</span>
        </template>
        <h3>任务复核<span>李四</span></h3>
        <div class="info">
          <p><span class="span1">办理时间：</span><span class="span2">2020-03-20 14:43</span></p>
          <p><span class="span1">办理时长：</span><span class="span2">5分钟</span></p>
          <p><span class="span1">下一环节：</span><span class="span2">复核</span></p>
          <p><span class="span1">接收人：</span><span class="span2">王五(郑州市生态环境综合行政执法支队)</span></p>
        </div>
      </van-step>
      <van-step>
        <template #inactive-icon>
          <span class="icon">3</span>
        </template>
        <h3>归档<span>王五</span></h3>
        <div class="info">
          <p><span class="span1">办理时间：</span><span class="span2">2020-03-20 14:43</span></p>
          <p><span class="span1">办理时长：</span><span class="span2">5分钟</span></p>
        </div>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  .page {
    background: #f2f2f2;
    min-height: 576px;
    padding: 20px 6px 9px 10px;
    /deep/ .van-steps {
      background: #f2f2f2;
      .van-step__title {
        margin-left: 8px;
      }
      .van-step__line{
        background: transparent;
        width: 0;
        border-left: .5px dotted #28A1FF;
      }
    }
    .icon {
      display: inline-block;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      color: #fff;
      line-height: 27px;
      background: #28A1FF;
      text-align: center;
      font-size: 15px;
    }
    h3 {
      margin: 0 0 4px 0;
      line-height: 24px;
      font-weight: 100;
      font-size: 18px;
      color: #333;
      span {
        float: right;
        font-size: 14px;
        color: #999999;
      }
    }
    .info {
      background: #fff;
      border-radius: 2px;
      padding: 10px 0 9px 12px;
      box-sizing: border-box;
      p {
        margin: 0 0 12px 0;
        line-height: 21px;
        font-size: 15px;
        color: #999;
        &:last-of-type {
          margin: 0;
        }
        .span1 {
          display: inline-block;
          margin-right: 12px;
          vertical-align: top;
          width: 75px;
        }
        .span2 {
          display: inline-block;
          vertical-align: top;
          max-width: 185px;
          color: #333;
        }
      }
    }
  }
</style>