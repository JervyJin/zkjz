<template>
  <div class="detailPage">
   {{this.list[0]}}
   {{this.list[1]}}
   {{this.list[2]}}
    <!-- 所有记录详情 -->
    <div>
      <van-cell-group>
        <van-cell title="企业信息" class="iconfont iconqiyexinxi" />
        <!-- <p class="title">企业信息</p> -->
        <van-cell title="企业名称：" :value="detail.QYMC" />
        <van-cell title="所属区域：" :value="detail.XZQY" />
        <van-cell title="企业类型：" :value="detail.QYLX" />
        <van-cell title="污染类型：" :value="detail.WRLX" />
      </van-cell-group>
    </div>

    <div class="zhifa" v-if="this.$route.query.nodeName==='例行执法'">
      <van-cell-group>
        <van-cell title="执法信息" class="iconfont iconhangzhengzhifa" />
        <!-- <p class="title">企业信息</p> -->
        <van-cell title="接收科室：" value="内容" />
        <van-cell title="执法期限：" value="内容" />
        <van-cell title="批示意见：" :value="detail.JCQK" />
      </van-cell-group>
    </div>
    <div class="zhifa" v-else-if="this.$route.query.nodeName==='主管领导审核'">
      <van-cell-group>
        <van-cell title="领导审核信息" class="iconfont iconhangzhengzhifa" />
        <!-- <p class="title">企业信息</p> -->
        <van-cell title="接收科室：" value="内容" />
        <van-cell title="执法期限：" value="内容" />
        <van-cell title="批示意见：" :value="detail.JCQK" />
      </van-cell-group>
    </div>

    <div class="diaocha">
      <van-cell-group>
        <van-cell title="调查取证" class="iconfont icontiaocha" />
        <!-- <p class="title">企业信息</p> -->
        <van-cell title="检查日期：" value="内容" />
        <van-cell title="勘察笔录：" value="内容" />
        <van-cell title="询问笔录：" value="内容" />
        <van-cell title="调查终结报告：" value="内容" />
        <van-cell title="其他：" value="内容" />
      </van-cell-group>
    </div>

    <div class="anjian" v-if="showPF">
      <van-cell-group>
        <van-cell title="案件调度" class="iconfont iconanjian" />
        <!-- <p class="title">企业信息</p> -->
        <van-cell title="处罚类型：" :value="value" />
      </van-cell-group>
      <van-cell-group v-if="this.value==='行政处罚'">
        <van-cell title="行政处罚告知书下达日期：" value="内容" />
        <van-cell title="行政处罚决定书下达日期：" value="内容" />
        <van-cell title="处罚金额：" value="内容" />
        <van-cell title="附件：" value="内容" />
      </van-cell-group>
      <van-cell-group v-else-if="this.value==='行政拘留'">
        <van-cell title="移交公安机关日期：" value="内容" />
        <van-cell title="公安机关：" value="内容" />
        <van-cell title="拘留书下达日期：" value="内容" />
        <van-cell title="行政拘留决定书：" value="内容" />
        <van-cell title="涉案人员：" value="内容" />
        <van-cell title="职务：" value="内容" />
        <van-cell title="单位：" value="内容" />
        <van-cell title="拘留天数：" value="内容" />
      </van-cell-group>
      <van-cell-group v-else-if="this.value==='刑事处罚'">
        <van-cell title="监察机关：" value="内容" />
        <van-cell title="批准逮捕日期：" value="内容" />
        <van-cell title="逮捕证：" value="内容" />
        <van-cell title="审判机关：" value="内容" />
        <van-cell title="审判日期：" value="内容" />
        <van-cell title="刑事决定书：" value="内容" />
        <van-cell title="犯罪分子：" value="内容" />
        <van-cell title="审判详情：" value="内容" />
      </van-cell-group>
    </div>
    <!-- 当前节点 -->
    <!-- <div style="padding:20px;">
      <span>当前节点:</span>
      <van-radio-group v-model="radio">
        <van-radio name="1">{{currentNodeInfo.currentNodeName}}</van-radio>
      </van-radio-group>
    </div>-->
    <!-- 下级节点 -->
    <!-- <span>下级节点:</span>
    <van-radio-group v-model="radio">
      <van-radio name="1">{{getNextNode}}</van-radio>
    </van-radio-group>-->

    <!-- 办理 -->
    <div>
      <van-button
        block
        type="info"
        native-type="button"
        @click="nextNode(this.list[0],this.list[1],this.list[2])"
      >办理</van-button>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import areaListInfo from "../../../components/common/area";
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载

let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  components: {
    areaListInfo
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      value: "刑事处罚",
      radio: "1",
      detail: {},
      workFlowId: "",
      workId: "",
      taskId: "",
      active: "",
      currentNodeInfo: {},
      nextNodeInfo: []
    };
  },
  computed: {
    // getNextNode(){
    //   return this.currentNodeInfo.currentNodeName==='主管领导审核'? this.nextNodeInfo[0].actionName:this.currentNodeInfo.currentNodeName==='调查取证'? this.nextNodeInfo[1].actionName:this.currentNodeInfo.currentNodeName==='案件分析'? this.nextNodeInfo[2].actionName:'结束'
    // }
  },
  computed: {
    showPF() {
      return this.workFlowId == "ANPFLC";
    }
  },
  methods: {
    showAddress() {
      this.showAddr = true;
    },
    addrConfirm(val) {
      // console.log(val)
      this.valArr = val;
      this.params.area = val[0].name + "-" + val[1].name + "-" + val[2].name;
      this.showAddr = false;
    },
    addrleCancel() {
      this.showAddr = false;
    },
    showPopup() {
      this.show = true;
    },
    handleConfirm(value) {
      this.params.jcrq = value;
      this.date = dayjs(value).format("YYYY-MM-DD");
      this.params.jcrq = this.date;
      this.show = false;
    },
    handleCancel() {
      this.params.jcrq = "";
      this.show = false;
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    add() {
      // this.params.zfrlist.push(1);
    },
    // del(index) {
    //   this.items.splice(index, 1);
    // },
    afterRead(file) {
      console.log(zxfxfiles);
      // this.zxfxfiles.push(file)
    },
    /***********************************************************************************************/

    // 进来先请求一下6.7待办列表得到6.4接口要的参数
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

    //       // if (this.currentNodeInfo.currentNodeID === "N1") {
    //       //   this.$router.push("/LeaderReview");
    //       // } else if (this.currentNodeInfo.currentNodeID === "N2") {
    //       //   this.$router.push("/diaoCha");
    //       // } else if (this.currentNodeInfo.currentNodeID === "N3") {
    //       //   this.$router.push("/diaoDu");
    //       // } else if (this.currentNodeInfo.currentNodeID === "N4") {
    //       //   this.$router.push("/fenXi");
    //       // }
    //     });
    // },

    /* 调取6.4接口获取当前节点和下级节点     */
    getCurrentNodeParams() {
      this.http
        .post("getWorkJkzfDetail", {
          userId: userinfo.userId,
          workFlowId: this.workFlowId,
          workId: this.workId,
          taskId: this.taskId
        })
        .then(res => {
          console.log(res);
          this.currentNodeInfo = res.data.workDetailInfo.workFlowInfo;
          this.nextNodeInfo = res.data.workDetailInfo.actionInfoList;

          if (this.currentNodeInfo.currentNodeID === "N1") {
            this.$router.push("/LeaderReview");
          } else if (this.currentNodeInfo.currentNodeID === "N2") {
            this.$router.push("/diaoCha");
          } else if (this.currentNodeInfo.currentNodeID === "N3") {
            this.$router.push("/diaoDu");
          } else if (this.currentNodeInfo.currentNodeID === "N4") {
            this.$router.push("/fenXi");
          }

          // this.nextNode();
        });
    },
    /************************************************************************************************************************/
    /**
     * 办理按钮，6.7去展示下一个节点
     */

    async nextNode(workFlowId, workId, taskId) {
      // console.log(this.currentNodeInfo.currentNodeID)
      try {
        await this.http
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
            this.daiban = res.data.workInfoList;
            this.daiban.map(item => {
              // console.log(item)
              this.workFlowId = item.workFlowId;
              this.workId = item.workId;
              this.taskId = item.taskId;
              this.getCurrentNodeParams();
            });

            if (this.currentNodeInfo.currentNodeID === "N1") {
              this.$router.push({
                path: "/LeaderReview",
                query: {
                  workFlowId: workFlowId,
                  workId: workId,
                  taskId: taskId
                }
              });
            } else if (this.currentNodeInfo.currentNodeID === "N2") {
              this.$router.push("/diaoCha");
            } else if (this.currentNodeInfo.currentNodeID === "N3") {
              this.$router.push("/diaoDu");
            } else if (this.currentNodeInfo.currentNodeID === "N4") {
              this.$router.push("/fenXi");
            } else if (this.currentNodeInfo.currentNodeID === "N5") {
              this.$router.push("/");
            }
          });
      } catch (error) {
        console.log(error);
      }

      //  this.dbList();
      //  if (this.currentNodeInfo.currentNodeID === "N1") {
      //       this.$router.push("/LeaderReview");
      //     } else if (this.currentNodeInfo.currentNodeID === "N2") {
      //       this.$router.push("/diaoCha");
      //     } else if (this.currentNodeInfo.currentNodeID === "N3") {
      //       this.$router.push("/diaoDu");
      //     } else if (this.currentNodeInfo.currentNodeID === "N4") {
      //       this.$router.push("/fenXi");
      //     }
    },

    /************************************************************************************************************************/
    /* 获取企业类型 */
    getQiye() {
      this.http.post("getDicListByType", { type: 49 }).then(res => {
        // console.log(res);
        this.qiyeType1 = res.data[0].NAME;
        this.qiyeType2 = res.data[1].NAME;
      });
    },
    /* 获取污染类型 */
    getWuran() {
      this.http.post("getDicListByType", { type: 50 }).then(res => {
        // console.log(res);
        this.wuranType1 = res.data[0].NAME;
        this.wuranType2 = res.data[1].NAME;
      });
    },
    /**获取企业详情*/

    getComponentDetail() {
      this.http.post("getCompanyDetiles", {});
    }
  },
  created() {
    // this.dbList();
    this.getWuran();
    this.getQiye();
  }
};
</script>

<style lang="scss" scoped>
// @import "../../assets/css/lib/vant-reset.css";
/deep/.van-tab--active {
  color: #177bf5;
}
/deep/.van-tabs__line {
  background-color: #177bf5;
}
.van-cell__title {
  margin-left: 8px;
}
/deep/.van-tabs__content {
  margin-top: 8px;
}

.iconfont {
  color: #335ad0;
  font-size: 17px;
  margin-right: 10px;
}
</style>