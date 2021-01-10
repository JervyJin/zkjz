<template>
  <div class="wrap">
 <van-row gutter="10" v-for="(item,i) in hisList" :key="i">
      <van-col span="2">1<div class="one"></div></van-col>
      <van-col span="20">
        <p class="title">
          <span>{{item.action}}</span>
          <span>{{item.userName}}</span>
        </p>
        <div class="mainBox">
          <p>办理时间：{{item.actiontime}}</p>
          <p>办理时长：{{item.remaintime}}</p>
          <p>下一环节：{{item.nextName}}</p>
          <p>接收人：{{item.nextUserName}}</p>
          <p class="yijian">意见11：{{item.comments}}</p>
        </div>
      </van-col>
    </van-row>

  </div>
</template>

<script>
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  data() {
    return {
      workFlowId:'',
      workId:'',
      hisList:[]
    }
  },
  created() {
    this.getListInfo()
  },
  methods: {
    getListInfo() {
    this.http
      .post("getJkzfWorkListByCondition", {
        userId: userinfo.userId,
        userName: userinfo.userName,
        toDoFlag: 0,
        myStartFlag: 0,
        pageNum: 1,
        pageSize: 10,
        manageType: ""
    
      })
      .then(res => {
        console.log(res);
        res.data.workInfoList.map(item => {
          // console.log(item)
          this.workFlowId = item.workFlowId;
          this.workId = item.workId;
        });
        this.getHis()
      });
  },

    getHis(){
      this.http.post("getJkzfWorkFlowHistory",{
        userId:userinfo.userId,
        workId:this.workId,
        workFlowId:this.workFlowId
      }).then(res=>{
        console.log(res)
        this.hisList=res.data.stepInfoList
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 10px 20px;
  font-size: 17px;
  .van-row {
    .title {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }
  }
  .van-col--2 {
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin-top: 8px;
    text-align: right;
    border-radius: 50%;
    background: #1890FF;
    color: #fff;
}
  .van-col--2 .one {
    // clear: both;
    // content: "";
    height: 170px;
    position: absolute;
    top: 86px;
    border-left: 2px dashed #1890FF;
    left: 29px;
    display: block;
    
  }
  .van-col--2 .two{
        height: 170px;
    position: absolute;
    border-left: 2px dashed #1890FF;
    left: 29px;
    display: block;
    }
  .mainBox {
    background: #fff;
    padding: 5px 10px;
    line-height: 30px;
    font-size: 16px;
    
  }
}
</style>