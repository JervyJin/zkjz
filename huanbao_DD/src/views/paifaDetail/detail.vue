<template>
  <div>
    title:案件派发详情
    {{this.$route.query.workFlowId}}
    {{this.$route.query.workId}}
    {{this.$route.query.taskId}}
    {{this.$route.query.actId}}
    {{this.$route.query.bizid}}
        <div class="detailPage">
          <!-- 所有记录详情 -->
          <div>
            <van-cell-group>
              <van-cell title="企业信息" class="iconfont iconqiyexinxi" />
              <!-- <p class="title">企业信息</p> -->
              <van-cell title="企业名称：" :value="data.QYMC" />
              <van-cell title="所属区域：" :value="data.XZQY" />
              <van-cell title="企业类型：" :value="data.QYLX" />
              <van-cell title="污染类型：" :value="data.WRLX" />
            </van-cell-group>
          </div>

          <div class="zhifa">
            <van-cell-group>
              <van-cell title="执法人信息" class="iconfont iconhangzhengzhifa" />
              <!-- <p class="title">企业信息</p> -->
              <van-cell title="接收科室：" value="内容" />
              <van-cell title="执法期限：" value="内容" />
              <van-cell title="批示意见：" :value="detail.JCQK" />
            </van-cell-group>
          </div>

          <!-- 办理 -->
          <div>
            <van-button block type="info" native-type="button" @click="nextNode()">办理</van-button>
          </div>
        </div>
    
  </div>
</template>

<script>
// import anJian from "./components/anjian";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  components: {
    // anJian,
    // liuZhuan
  },
  data() {
    return {
      value: "刑事处罚",
      radio: "1",
      detail: {},
      workFlowId: "",
      workId: "",
      taskId: "",
      currentNodeInfo: {},
      nextNodeInfo: [],
      // bizid: "",
      data: {}
    };
  },
  computed: {
    showPF() {
      return this.workFlowId == "ANPFLC";
    }
  },
  created() {
    // this.dbList();
    this.getDetail();
  },
  methods: {
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
    //       this.daiban = res.data.workInfoList;
    //       res.data.workInfoList.map(item => {
    //         console.log(item);
    //         this.bizid = item.bizid;
    //         this.getDetail();
    //       });
    //       // this.getWork();
    //     });
    // },
    

    // 企业详情接口
    getDetail() {
      this.http
        .post("getCompanyDetiles", {
          id: this.$route.query.bizid
        })
        .then(res => {
          console.log(res);
          this.data = res.data;
        });
    },

    /**
     * 办理按钮，6.7去展示下一个节点
     */

    nextNode() {
      console.log(this.$route.query.actId);

      if (this.$route.query.actId === "P1") {
        this.$router.push({
          path: "/zuGuan",
          query: {
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            taskId: this.$route.query.taskId,
            actId: this.$route.query.actId,
            bizid: this.$route.query.bizid,
          }
        });
      } else if (this.$route.query.actId === "P2") {
        this.$router.push({
          path: "/zuRen",
          query: {
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            taskId: this.$route.query.taskId,
            actId: this.$route.query.actId,
            bizid: this.$route.query.bizid,
          }
        });
      } else if (this.$route.query.actId === "P3") {
        this.$router.push({
          path: "/diaoDu",
          query: {
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            taskId: this.$route.query.taskId,
            actId: this.$route.query.actId,
            bizid: this.$route.query.bizid,
          }
        });
      } else if (this.$route.query.actId === "P4") {
        this.$router.push({
          path: "/paifaDiaocha",
          query: {
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            taskId: this.$route.query.taskId,
            actId: this.$route.query.actId,
            bizid: this.$route.query.bizid,
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-tab--active {
  color: #177bf5;
}
/deep/.van-tabs__line {
  background-color: #177bf5;
}
.anjian,
.liuzhuan {
  margin-top: 6px;
}
</style>