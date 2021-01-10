<template>
  <div>
    <h1>科室主任审核</h1>
     {{this.$route.query.workFlowId}}
    {{this.$route.query.workId}}
    {{this.$route.query.taskId}}
    {{this.$route.query.actId}}
    {{this.$route.query.bizid}}
    <van-form>
      <!-- 当前节点 -->
      <!-- <div style="padding:20px;">
      <span>当前节点:</span>
      <van-radio-group v-model="radio">
        <van-radio name="1">{{currentNodeInfo.currentNodeName}}</van-radio>
      </van-radio-group>
      </div>-->
      <!-- 下级节点 -->
      <div class="oth">
        <span>选择下级节点:</span>
      <van-radio-group v-model="radio">
        <van-radio
          :name="index"
          v-for="(item,index) in nextNodeInfo"
          :key="index"
        >{{item.actionName}}</van-radio>
      </van-radio-group>
      </div>

      <!-- 意见 -->
      <van-field
        v-model="message"
        required
        rows="1"
        autosize
        label="意见"
        type="textarea"
        placeholder="请输入您的意见"
        input-align="left"
      />
      <!-- 抄送 -->
      <van-field name="copy" label="抄送">
        <template #input>
          <van-checkbox-group v-model="copy">
            <van-checkbox name="1" shape="square">中心主任</van-checkbox>
            <van-checkbox name="2" shape="square">综合执法室</van-checkbox>
          </van-checkbox-group>
          <van-button type="info" size="small" style="margin-left: 60px;">选择</van-button>
        </template>
      </van-field>
      <!-- 下步办理人 -->
      <div class="oth">
        <span>选择下步办理人:</span>
        <van-radio-group v-model="nextR" >
          <van-radio :name="index" v-for="(item,index) in nextRen" :key="index" style="margin-top: 10px;">{{item.authorInfoList[1].userName}}</van-radio>
        </van-radio-group>
      </div>
      <!-- 提交 -->
      <div style="margin: 16px;">
        <van-button block type="info" native-type="button" @click="banliBtn">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  data() {
    return {
      radio: "index", //办理节点
      nextR: "index",
      copy: [],
      message: "",
    
      currentNodeInfo: {},
      nextNodeInfo: [],
      nextRen: [
        {
          routeId: "N2",
          routeName: "主管领导审核",
          authorInfoList: [
            { userId: "124151235321616739" },
            { userName: "周梦凡" }
          ]
        },
       {
          routeId: "N2",
          routeName: "主管领导审核",
          authorInfoList: [
            { userId: "124151235321613739" },
            { userName: "周梦凡2" }
          ]
        }
      ],
      actionItem: {}
    };
  },

  created() {
    // this.dbList();
    this.getCurrentNodeParams();
  },
  methods: {
    // 进来先请求一下待办列表得到6.4接口要的参数,这里我没有调取是从上级通过路由传参过来的
    // dbList() {
    //   this.http
    //     .post("getJkzfWorkListByCondition", {
    //       userId: userinfo.userId,
    //       userName: userinfo.userName,
    //       toDoFlag: 0,
    //       myStartFlag: 0,
    //       pageNum: 1,
    //       pageSize: 10,
    //       manageType: ""
    //     })
    //     .then(res => {
    //       console.log(res);
    //       this.daiban = res.data.workInfoList;
    //       this.daiban.map(item => {
    //         // console.log(item)
    //         this.workFlowId = item.workFlowId;
    //         this.workId = item.workId;
    //         this.taskId = item.taskId;
    //         this.getCurrentNodeParams();
    //       });
    //     });
    // },

    /* 调取6.4接口获取下级节点     */
    getCurrentNodeParams() {
      this.http
        .post("getWorkJkzfDetail", {
          userId: userinfo.userId,
          workFlowId: this.$route.query.workFlowId,
          workId: this.$route.query.workId,
          taskId: this.$route.query.taskId
        })
        .then(res => {
          console.log(res);
          this.currentNodeInfo = res.data.workDetailInfo.workFlowInfo;
          this.nextNodeInfo = res.data.workDetailInfo.actionInfoList;
          res.data.workDetailInfo.actionInfoList.map(item => {
            this.actionItem = item;
          });
        });
    },

    // 下步办理人接口（这个调取钉钉接口）
    // nextR(){
    //   this.http.post("jkzfUserChooseList",)
    // },
    /* 6.2  办理监控执法流程实例（doJfzfAction） */
    banliBtn() {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '提交中',
        loadingType: 'spinner',
        selector: '#custom-selector',
      });      
      let routeInfolist = JSON.stringify(this.nextRen);
      this.http
        .post("doJfzfAction", {
          currentUserId: userinfo.userId,
          workId: this.$route.query.workId,
          workFlowId: this.currentNodeInfo.workFlowID,
          workFlowName: this.currentNodeInfo.workFlowName,
          userId: userinfo.userId,
          actionId: this.actionItem.actionId,
          actionName: this.actionItem.actionName,
          currentNodeId: this.currentNodeInfo.currentNodeID,
          currentNodeName: this.currentNodeInfo.currentNodeName,
          currentTrackId: this.currentNodeInfo.currentTrackId,
          comments: this.message,
          taskId: this.currentNodeInfo.taskId,
          routeInfolist: routeInfolist
        })
        .then(res => {
          console.log(res);
          toast.clear();
          this.$router.push("/daiban")
          this.$toast({message:'提交成功'})
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.van-checkbox {
  padding: 6px 0;
}
.oth{
  font-size: 14px;
  padding: 10px;
}
</style>