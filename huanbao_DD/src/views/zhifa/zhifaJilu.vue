<template>
  <div class="zhifaPage">
    <!-- title:执法记录 -->
    <van-tabs v-model="active" @change="handleChange">
      <!-- srarch -->
      <van-search v-model="value" show-action placeholder="请输入搜索关键词">
        <template #action>
          <van-button type="info" size="small" @click="onSearch()">搜索</van-button>
        </template>
      </van-search>
      <!-- my record list -->
      <van-tab title="我的记录">
        <template #title>
          我的记录
          <van-tag round type="danger" v-if="myRecord.length">{{myRecord.length}}</van-tag>
        </template>
        <van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了"
            @load="onLoad">
            <van-empty description="暂无数据" v-if="!myRecord.length"/>
            <div v-else v-for="(i,index) in myRecord" :key="index">
              <div class="contentBox" @click="myDetail(i.ID,i.CURNODENAME,i.TYPE,i.WORKID,i.WORKFLOWID)">
                <div class="left">
                  <p>企业名称：{{i.QYMC}}</p>
                  <p>所属区域：{{i.XZQY}}</p>
                  <p>企业类型：{{i.QYLX==0 ? '排污企业' :'非排污企业'}}</p>
                </div>
                <div class="right">
                  <p>{{i.CREATETIME | getDate}}</p>
                  <p>{{i.CURNODENAME}}</p>
                  <p>{{i.TYPE==1?'自行发现':"领导派发"}}</p>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- all record list -->
      <van-tab title="所有记录">
        <template #title>
          所有记录
          <van-tag round type="danger" v-if="allRecord.length">{{allRecord.length}}</van-tag>
        </template>
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了"
            @load="onLoad">
            <van-empty description="暂无数据" v-if="!allRecord.length"/>
            <div v-else v-for="(i,index) in allRecord" :key="index">
              <div class="contentBox" @click="allDetail(i.ID,i.CURNODENAME,i.TYPE,i.WORKID,i.WORKFLOWID)">
                <div class="left">
                  <p>企业名称：{{i.QYMC}}</p>
                  <p>所属区域：{{i.XZQY}}</p>
                  <p>企业类型：{{i.QYLX}}</p>
                  <!-- {{i.QYLX==0 ? '排污企业' :'非排污企业'}} -->
                </div>
                <div class="right">
                  <p>{{i.CREATETIME | getDate}}</p>
                  <p>{{i.CURNODENAME}}</p>
                  <p>{{i.TYPE==1?'自行发现':"领导派发"}}</p>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- bottom menu -->
    <!-- <van-tabbar route>
      
      <van-tabbar-item to="/zxFaxian" icon="contact">自行发现</van-tabbar-item>
      <van-tabbar-item to="/paifa" icon="friends-o">领导派发</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>
<script>
  let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
  import dayjs from "dayjs"
  import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
  export default {
    data() {
      return {
        active: "", //当前切换的选项卡
        value: "",
        isLoading: false, //下拉状态
        loading: false, //加载状态
        finished: false, //加载完成状态
        myRecord: [
          // {
          //   id: "vfgrghtrh",
          //   recordType: 1, //0 我的记录；1 所有记录
          //   company: "王老二网络科技有限公司",
          //   area: "周口市 商水县",
          //   // compType:{0:'排污企业','非排污企业':1},
          //   compType: 0,
          //   time: "2020-04-13",
          //   findType: 1
          // },

        ],
        allRecord: [],
        page:1
      };
    },
    created() {
      this.myjilu();
      /* 设置导航栏标题 */
      dd.ready(() => {
        dd.biz.navigation.setTitle({
          title: "案件查询" // 控制标题文本，空字符串表示显示默认文本
        });
      });
    },
    filters: {
    getDate(v) {
      return dayjs(v).format("YYYY-MM-DD")
    }
  },
    methods: {
      onSearch() {
        this.$toast.loading({
          message: '加载中',
        })
        this.page = 1;
        this.http.post("getZfjlList", {
          title: this.value,
          type: this.active, 
          userid: userinfo.userId,
          page: this.page
        }).then(res => {
          console.log(res)

          if (res.state == '1') {
            this.$toast.clear();
            this.value = null;
            if(this.active == 0) {
              this.myRecord = res.data.list;
              console.log(res.data.list,'我的记录....')
            }
            if(this.active == 1) {
              
              this.allRecord = res.data.list;
            }
          }
        });

      },
      onRefresh() {
        this.page = 1;
        if (this.active == 0) {
          this.myjilu(-1);
        } else if (this.active == 1) {
          this.alljilu(-1);
        }
      },
      onLoad() {
        if (this.active == 0) {
          this.page++;
          this.myjilu();
        } else if (this.active == 1) {
          this.page++;
          this.alljilu();
        }
        
        // setTimeout(() => {
        //   this.loading = false;
        //   this.finished = true;
        // }, 1000);
      },
      // 获取查询列表方法
      myjilu(v) {
        let data = {
          page: this.page,
          type: 0,
          userid: userinfo.userId
        }
        this.http
          .post("getZfjlList", data)
          .then(res => {
            if(!res.data.list.length) {
              this.finished = true;
            }
            if(v == -1) {
              // this.myRecord = [ ...res.data.list, ...this.myRecord];
              this.myRecord = res.data.list;
              this.isLoading = false;
            } else {
              this.loading = false;
              // this.myRecord = [...this.myRecord, ...res.data.list];
              this.myRecord = this.myRecord.concat(res.data.list)
            }
          });
      },

      alljilu(v) {
        let data = {
          type: 1, 
          userid: userinfo.userId,
          page: this.page
        }
        this.http.post("getZfjlList", data).then(res => {
          // this.loading = false;
          if(!res.data.list.length) {
            this.finished = true;
          }
          if(v == -1) {
            this.isLoading = false;
            // this.allRecord = [...res.data.list, this.allRecord];
            this.allRecord = res.data.list;
          } else {
            this.loading = false;
            // this.allRecord = [this.allRecord, ...res.data.list];
            this.allRecord = this.allRecord.concat(res.data.list)
          }
        });
      },
      handleChange() {
        console.log(this.active);
        if (this.active == 0) {
          this.page = 1;
          this.myRecord = []
          this.myjilu();
        } else if (this.active == 1) {
          this.page = 1;
          this.allRecord = []
          this.alljilu();
        }
      },
      myDetail(id, nodeName, type, workId, workFlowId) {
        console.log(workId)
        this.$router.push({
          path: "/alldetail",
          query: {
            id: id,
            type: type,
            workId: workId,
            workFlowId: workFlowId
          }
        });
      },
      /* 
       *id 案件id
       *nodeName 节点名称
       */
      allDetail(id, nodeName, type, workId, workFlowId) {
        this.$router.push({
          path: "/alldetail",
          query: {
            id: id,
            nodeName: nodeName,
            type: type,
            workId: workId,
            workFlowId: workFlowId
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  // @import "../../assets/css/lib/vant-reset.css";
  /deep/.van-tab--active {
    color: #177bf5;
  }
  /deep/.van-tabbar-item{
    font-size: 15px;
  }
  /deep/.van-tabbar-item__icon{
    font-size: 22px;
  }
  
  /deep/.van-tabs__line {
    background-color: #177bf5;
  }

  .van-search {
    background: #f6f6f6;
  }

  .van-search__content {
    background: #fff;
  }

  .zhifaPage {
    max-height: 100vh;
    overflow-y: auto;
    margin-bottom: 60px;

    .contentBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #949398;
      font-size: 14px;
      line-height: 30px;
      height: 110px;
      background: #fff;
      border-bottom: 1px solid #d3d2d6;
    }

    // .van-tabbar {
    //   height: 60px;
    // }

  }

  .iconfaxian:before,
  .iconbianji:before {
    font-size: 22px;
  }
</style>