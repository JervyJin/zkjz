<template>
  <div class="page">
    <div class="container">
      <div class="item van-hairline--bottom">
        <span><span class="star">*</span>立案登记时间：</span>
        <span>{{form.caseTime}}</span>
      </div>
      <div class="item van-hairline--bottom">
        <span><span class="star">*</span>立案登记号：</span>
        <span>{{form.caseCode}}</span>
      </div>
      <div class="item van-hairline--bottom">
        <span><span class="star">*</span>涉嫌违法行为类型：</span>
        <span :class="form.caseIllegalType ? '' : 'noData'" @click="selectHandle">{{form.caseIllegalType || '请选择'}} <van-icon name="arrow" /></span>    
      </div>
      <div class="area van-hairline--bottom">
        <div class="label">
          <span class="star">*</span>案件名称：
        </div>
        <textarea placeholder="请输入" :value="form.caseName"/>
      </div>
      <div class="item van-hairline--bottom">
        <div>
          <span class="star">*</span>案件来源：
        </div>
        <span :class="form.caseSource ? '' : 'noData'" @click="selectHandle">{{form.caseSource || '请选择'}} <van-icon name="arrow" /></span>   
      </div>
      <div class="area van-hairline--bottom">
        <div class="label">
          <span class="star">*</span>案件简要情况：
        </div>
        <textarea placeholder="请输入" :value="form.caseBrief"/>
      </div>
      <div class="item van-hairline--bottom" @click="addBL(1)">
        <div>
          <span class="star">*</span>询问笔录：
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="item van-hairline--bottom" @click="addBL(2)">
        <div>
          <span class="star">*</span>勘查笔录：
        </div>
        <van-icon name="arrow" />
      </div>
      
      <van-button class="btn-submit" type="primary" block color="#1890FF" @click="submit">提交</van-button>

    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
export default {
  name: "send",
  data() {
    return {
      show: false,
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
      form: {
        caseTime: '2020-03-20',
        caseCode : 'zz202020202020',
        caseIllegalType: '',
        caseName: '',
        caseSource: '现场检查',
        caseBrief: ''
      },
      options1: ['临时任务', '任务1']
    }
  },
  methods: {
    selectHandle(e) {
      this.show = true;
    },
    submit(e) {
      
    },
    onSelect(action, index) {
      console.log(action, index);
      this.show = false;
    },
    // 添加笔录
    addBL(v) {
      if(v === 1) {  // 询问笔录
        this.$router.push('/task/illegal/xwbl');
      } else {  // 勘查笔录
        this.$router.push('/task/illegal/kcbl');
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    height: calc(100vh - 44px);
    overflow-y: auto;
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

    
    /deep/ .van-icon-arrow{
      color: #ccc;
      vertical-align: middle;
    }
  }
</style>
