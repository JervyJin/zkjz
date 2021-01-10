<template>
  <div>
    title:案件报备详情
    {{this.$route.query.workFlowId}}
    {{this.$route.query.workId}}
    {{this.$route.query.taskId}}
    {{this.$route.query.actId}}
    <van-tabs v-model="active" swipeable>
      <van-tab title="案件详情">
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
      </van-tab>
      <van-tab title="流转记录">
        <div class="liuzhuan">
          <liuZhuan />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import anJian from "./components/anjian";
import liuZhuan from "./components/liuzhuan";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  components: {
    // anJian,
    liuZhuan
  },
  data() {
    return {
      active: "",
      value: "刑事处罚",
      radio: "1",
      detail: {},
      workFlowId: "",
      workId: "",
      taskId: "",
      active: "",
      currentNodeInfo: {},
      nextNodeInfo: [],
      bizid: "",
      data: {}
    };
  },
  computed: {
    showPF() {
      return this.workFlowId == "ANPFLC";
    }
  },
  created() {
    this.dbList();
  },
  methods: {
    dbList() {
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
          this.daiban = res.data.workInfoList;
          res.data.workInfoList.map(item => {
            console.log(item);
            this.bizid = item.bizid;
            this.getDetail();
          });
          // this.getWork();
        });
    },
    

    // 企业详情接口
    getDetail() {
      this.http
        .post("getCompanyDetiles", {
          id: this.bizid
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

      if (this.$route.query.actId === "N1") {
        this.$router.push({
          path: "/LeaderReview",
          query: {
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            taskId: this.$route.query.taskId,
            actId: this.$route.query.actId
          }
        });
      } else if (this.$route.query.actId === "N2") {
        this.$router.push({
          path: "/diaoCha",
          query: {
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            taskId: this.$route.query.taskId,
            actId: this.$route.query.actId
          }
        });
      } else if (this.$route.query.actId === "N3") {
        this.$router.push({
          path: "/diaoDu",
          query: {
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            taskId: this.$route.query.taskId,
            actId: this.$route.query.actId
          }
        });
      } else if (this.$route.query.actId === "N4") {
        this.$router.push({
          path: "/fenXi",
          query: {
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            taskId: this.$route.query.taskId,
            actId: this.$route.query.actId
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