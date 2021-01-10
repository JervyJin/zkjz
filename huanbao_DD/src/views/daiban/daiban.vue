<template>
  <div class="daibanPage">
    <!-- title:待办事项{{orgId}} -->
    <van-tabs v-model="active" swipeable @change="handleChange">
      <van-tab title="待处理">
        <template #title>
          待办理
          <van-tag round type="danger" v-if="daiban.length">{{daiban.length}}</van-tag>
        </template>
        <van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
          <van-empty description="暂无数据" v-if="!daiban.length"/>
            <div class="card_box" v-else v-for="(item,index) in daiban" :key="index" @click="next(item)">
              <div class="main" >
                <h1>
                  
                  {{item.title}}
                </h1>
                <p v-if="item.qymc!=''">企业名称：{{item.qymc}}</p>
                <p>案件来源：{{item.ajly}}</p>
                <p v-if="item.workFlowId=='ANBBLC'">检查时间：{{item.jcrq}}</p>
                <p v-if="item.workFlowId == 'ANPFLC'">牵头科室：{{item.qtks}}</p>
                <p v-if="item.workFlowId == 'ANPFLC'">协助科室：{{item.xzks}}</p>
              </div>
              <van-divider />
              <div class="flexP">
                <div class="left">
                  <p style="margin-bottom: 10px;font-size: 14px;color: #0099FF;">当前节点：{{item.actName}}</p>
                  <span>{{item.receiveTime}}</span>
                  <!-- <span>来自：{{item.receiveFromUserName}}的审批</span> -->
                </div>
                <span class="next">办理</span>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已办理">
        <van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
          <van-empty description="暂无数据" v-if="!yiban.length"/>
            <div class="card_box" v-else v-for="(item,index) in yiban" :key="index" @click="next(item)">
              <div class="main">
                <h1>{{item.title}}</h1>
                <p>案件来源：{{item.ajly}}</p>
                <p v-if="item.workFlowId == 'ANPFLC'">牵头科室：{{item.qtks}}</p>
                <p v-if="item.workFlowId == 'ANPFLC'">协助科室：{{item.xzks}}</p>
              </div>
              <van-divider />
              <div class="flexP">
                <div class="left">
                  <span>{{item.receiveTime}}</span>
                </div>
                <van-button size="small" style="font-size:14px;" type="primary">{{item.actName}}</van-button>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="抄送我">
        <template #title>
          抄送我
          <!-- <van-tag type="danger" class="point"></van-tag> -->
        </template>
        <div class="checkBox">
          <van-checkbox v-model="checked" @click="noReadClick">仅查看未读({{chaosongwo.length}})</van-checkbox>
          <van-button plain type="info" size="mini" @click="checkStatus(1)">全部标为已读</van-button>
        </div>
        <van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
           
          >
          <van-empty description="暂无数据" v-if="!chaosongwo.length"/>
            <!--  -->
            <div class="card_box" v-else v-for="(item,i) in chaosongwo" :key="i">
              <div class="main"  @click="next(item)">
                <h1>
                  <i v-if="item.status==1"></i>
                  {{item.title}}
                </h1>
                <p>企业名称：{{item.qymc || ''}}</p>
                <p>姓名：{{item.csrName}}</p>
              </div>
              <van-divider />
              <div class="flexP">
                <div class="left">
                  <span>{{item.createTime | getDate}}</span>
                  <span>来自：{{item.actionName}}</span>
                </div>
                <van-button size="small" type="primary">{{item.curNodeName}}</van-button>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- card-box -->
  </div>
</template>

<script>
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
import dayjs from "dayjs";
export default {
  data() {
    return {
      orgId: '', // 当前人机构id
      data: '',
      active: "", //当前切换的选项卡默认0
      isLoading: false, //下拉状态
      loading: false, //加载状态
      finished: false, //加载完成状态
      checked: false,
      daiban: [],
      yiban: [],
      chaosongwo: [],
      id:"",
      workFlowId: "",
      workId: "",
      taskId: "",
      actId:"",
      pageNum: 1
    };
  },
  created() {
    this.active = this.$store.state.activeTab || 0
    if(this.active == 0) {
      this.dbList();
    }
    if(this.active == 1) {
      this.ybList();
    }
    if(this.active == 2) {
      this.cswList();
    }
    
      dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "待办事项" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
  filters: {
    getDate(v) {
      return dayjs(v).format("YYYY-MM-DD")
    }
  },
  methods: {
    /**
     * 监控执法流程实例详情6.4,获取到当前案件下一步节点
     * @workId 流程主键
     * @userId
     * @workFlowId 业务主键
     * @taskId 流程taskId
     * */
    // getWork() {
    //   this.http
    //     .post("getWorkJkzfDetail", {
    //       userId: userinfo.userId,
    //       workFlowId: this.workFlowId,
    //       workId: this.workId,
    //       taskId: this.taskId
    //     })
    //     .then(res => {
    //       console.log(res);
    //       this.currentNodeInfo = res.data.workDetailInfo.workFlowInfo;
    //       this.nextNodeInfo = res.data.workDetailInfo.actionInfoList;
    //     });
    // },


    /*******************************************************************************************************************/
    /**
     * 获取待办、已办列表(6.7)
     * @userId  当前用户的userId 从localstorage中读取
     * @toDoFlag  待办（0）/已办（1）标记
     * @myStartFlag 我发起的标记0:不限
     * @pageNum 、pageSize
     * @manageType  ""
     *
     */
    dbList(v) {
      this.http
        .post("getJkzfWorkListByCondition", {
          userId: userinfo.userId,
          userName:userinfo.userName,
          toDoFlag: 0,
          myStartFlag: 0,
          pageNum: this.pageNum,
         
          pageSize: 10000,
          manageType: ""
        })
        .then(res => {
          // this.data = JSON.stringify(res)
          if(!res.data.workInfoList.length) {
            this.finished = true;
          }
          if(v == -1) {
            //this.daiban = [ ...res.data.workInfoList, ...this.daiban];
			this.daiban = res.data.workInfoList;            this.isLoading = false;
          } else {
            this.loading = false;
            // this.daiban = [...this.daiban, ...res.data.workInfoList];
            this.daiban = res.data.workInfoList;
          }
          // res.data.workInfoList.map(item => {
          //   console.log(item)
            // this.workFlowId = item.workFlowId;
            // this.workId = item.workId;
            // this.taskId = item.taskId;
            // this.actId  = item.actId;
            // this.orgId = item.orgid;
          // });
          // this.getWork();
        });
    },
    ybList(v) {
      this.http
        .post("getJkzfWorkListByCondition", {
          userId: userinfo.userId,
          toDoFlag: 1,
          myStartFlag: 0,
          pageNum: this.pageNum,
          pageSize: 100000,
          manageType: ''
        })
        .then(res => {
          console.log(res);
          // this.yiban = res.data.workInfoList;
          if(!res.data.workInfoList.length) {
            this.finished = true;
          }
          if(v == -1) {
            //this.yiban = [ ...res.data.workInfoList, ...this.yiban];
this.yiban = res.data.workInfoList;            this.isLoading = false;
          } else {
            this.loading = false;
            // this.yiban = [...this.yiban, ...res.data.workInfoList];
            this.yiban = res.data.workInfoList;
          }
        });
    },
    // 抄送我
    cswList(v) {
      this.http
        .post("getCswList", {
          userid: userinfo.userId,
          pageNum: this.pageNum,
          pageSize: 10000
        })
        .then(res => {
          console.log(res);
          // this.chaosongwo = res.data.list;
          if(!res.data.list.length) {
            this.finished = true;
          }
          if(v == -1) {
            //this.chaosongwo = [ ...res.data.list, ...this.chaosongwo];
this.chaosongwo = res.data.list;            this.isLoading = false;
          } else {
            this.loading = false;
            // this.chaosongwo = [...this.chaosongwo, ...res.data.list];
            this.chaosongwo = res.data.list;
          }
          this.id = res.data.list[0].ID
        });
    },
    /* 仅查看未读 */
    noRead(){
      this.http
        .post("getCswList", {
          userid: userinfo.userId,
          pageNum: 1,
          status:1,
          pageSize: 10000
        })
        .then(res => {
          console.log(res);
          this.chaosongwo = res.data.list;
          
        });
    },
    noReadClick(){
      if(this.checked==true){
        this.noRead()
      }else{
        this.cswList()
      }
    },
    /* 修改已读状态 */
    checkStatus(i, csrId){
      let data = {
        userid: userinfo.userId,
        status: i ? 2 : 1
      }
      if(i==0) {
        data.id = csrId
      }
      this.http
        .post("updateCsrStatus",data)
        .then(res => {
          console.log(res);
          this.cswList()
        });
    },
    /**
     * 切换选项卡请求列表数据
     */
    handleChange() {
      console.log(this.active, "切换选项卡请求列表数据");
      this.$store.commit('setActiveTab', this.active)
      if (this.active == 0) {
        this.pageNum = 1;
        this.daiban = [];
        this.dbList();
      } else if (this.active == 1) {
        this.pageNum = 1;
        this.yiban = [];
        this.ybList();
      } else {
        this.pageNum = 1;
        this.chaosongwo = [];
        this.cswList();
      }
    },
    /**办理按钮
     * 这里注意两个问题1、根据案件类型跳转不同页面 2、根据当前节点Workflowid判断下级节点
     * */

     next(item) {
       if(this.active == 2) {
         this.checkStatus(0, item.csrId);
       }
        if (item.workFlowId == "ANBBLC") {
          this.$router.push({
            path:"/alldetail",
            query:{
              id: this.active == 2 ? item.id :item.bizid || '',
              taskId:item.taskId || '',
              nodeName: item.actId || '',
              workId: item.workId || '',
              workFlowId: item.workFlowId || '',
              type: 1,
            }
          })
        } else if (item.workFlowId == "ANPFLC") {
          this.$router.push({path:"/alldetail",query:{
              // workFlowId:workFlowId,
              // workId:workId,
              // taskId:taskId,
              // actId:actId,  // nodeName
              // bizid:bizid   // id
              
              id: this.active == 2 ? item.id :item.bizid || '',
              taskId:item.taskId || '',
              nodeName: item.actId || '',
              workId: item.workId || '',
              workFlowId: item.workFlowId || '',
              type: 2,
              orgId: item.orgid || ''
          }});
        }

    },
    /* 下拉刷新 */
    onRefresh() {
      this.pageNum = 1
      if (this.active == 0) {
        this.dbList(-1);
      } else if (this.active == 1) {
        this.ybList(-1);
      } else {
        this.cswList(-1);
      }
      // setTimeout(() => {
      //   this.isLoading = false;
      //   this.finished = true;
      // }, 1000);
    },
    /* 上拉加载更多（分页） */
    onLoad() {
      this.pageNum ++;
      if (this.active == 0) {
        this.dbList();
      } else if (this.active == 1) {
        this.ybList();
      } else {
        this.cswList();
      }
      // setTimeout(() => {
      //   this.loading = false;
      //   this.finished = true;
      // }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.daibanPage{
  max-height: 100vh;
  overflow-y: auto;
}
/deep/.van-tab--active {
  color: #177bf5;
}
/deep/.van-tabs__line {
  background-color: #177bf5;
}

.point {
  height: 9px;
  border-radius: 50%;
}
.van-button--mini {
  padding: 10px;
  border-radius: 12px;
  font-size: 12px;
}
.checkBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
  margin-top: 10px;
}
.van-checkbox {
  font-size: 12px;
  /deep/.van-checkbox__label {
    color: #8a8d90;
  }
}
.card_box {
  padding: 10px 20px;
  border-radius: 15px;
  border-bottom: 1px solid #ccc;
  background: #fff;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  .main {
    font-size: 16px;
    line-height: 26px;

    h1 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      i {
        width: 8px;
        height: 8px;
        background: #ee0a24;
        display: inline-block;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 5px;
      }
      .van-image--round {
        vertical-align: text-bottom;
        margin-right: 10px;
      }
    }
    p {
      color: #999;
    }
  }
  .flexP {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 14px;
      color: #999;
    }
    .next {
      color: #0099ff;
      font-size: 16px;
    }
  }
}
</style>