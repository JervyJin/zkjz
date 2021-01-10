<template>
  <div class="page">
    <div class="container">
      <div class="item van-hairline--bottom">
        <span>任务编码：</span>
        <span>{{form.code}}</span>
      </div>
      <div class="item van-hairline--bottom">
        <span>任务类型：</span>
        <span>{{form.taskType}}</span>
      </div>
      <div class="item van-hairline--bottom">
        <span>执法对象类型：</span>
        <span>{{form.objType}}</span>    
      </div>
      <div class="item van-hairline--bottom">
        <div>执法对象：</div>
        <span>{{form.taskObj}}</span>   
      </div>
      <div class="item van-hairline--bottom">
        <div>
          派发日期：
        </div>
        <span>{{form.sendDate}}</span>   
      </div>
      <div class="area van-hairline--bottom">
        <div class="label">
          任务名称：
        </div>
        <textarea placeholder="请输入" :value="form.taskName" readonly/>
      </div>
      <div class="area van-hairline--bottom">
        <div class="label">
          主要内容：
        </div>
        <textarea placeholder="请输入"  :value="form.taskContent" readonly/>
      </div>
      <div class="item van-hairline--bottom">
        <div>
          紧急程度：
        </div>
        <span>{{form.level}}</span>
      </div>
      <div class="item van-hairline--bottom">
        <div>要求完成时间：</div>
        <span>{{form.finishTime}}</span>
      </div>
      <div class="item van-hairline--bottom">
        <div>派发人：</div>
        <span>{{form.sendPerson}}</span>
      </div>
      <!-- <div class="area">
        <div class="label">上传附件：</div>
        <div class="btn-file">
          <van-uploader v-model="form.files" class="icon"/>
          <span class="desc">可上传音频、视频、图片、文档</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "send",
  data() {
    return {
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
      form: {
        code : 'zz202020202020',
        taskType: '临时任务',
        objType: '工业污染源',
        taskObj: '东风路1公司',
        taskName: '东风路1公司2020-03-20临时任务',
        taskContent: '东风路1公司2020-03-20临时任务',
        sendDate: '2020-03-20',
        level: '一般',
        finishTime: '2020-04-20',
        files: [],
        sendPerson: '张三'
      },
      options1: ['临时任务', '任务1']
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .page{
    .container{
      padding: 3px 15px 20px;
    }
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px 0;
      // border-bottom: .5px solid #f2f2f2;
    }
    .star{
      display: inline;
      color: #F22424;
    }
    .item input{
      text-align: right;
    }
    .item .radio{
      margin-left: 40px;
    }
    .area{
      padding: 13px 0;
      // border-bottom: .5px solid #f2f2f2;
    }
    .area .label{
      margin-bottom: 13px;
    }
    .area textarea{
      display: block;
      border: none;
      width: 100%;
    }
    .area .btn-file{
      display: flex;
      align-items: center;
    }
    .area .btn-file .icon{
      width: 76px;
      height: 76px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 60px;
      color: #CCCCCC;
      border: 1px dashed #CCCCCC;
      border-radius: 2px;
      /deep/ .van-uploader__upload {
        width: 100%;
        height: 100%;
        margin: 0;
      }
    }
    .area .btn-file .desc{
      color: #CCCCCC;
      margin-left: 10px;
    }
    .noData{
      color: #CCCCCC;
    }

    .btn-submit{
      border-radius: 2px;
      margin-top: 30px;
    }
  }
</style>
