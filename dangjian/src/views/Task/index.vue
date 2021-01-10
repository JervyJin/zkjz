<template>
  <div>
    <van-tabs @click="handleClick">
      <van-tab v-for="(item, index) in types" :key="index" :title="item.name">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell-group @click="gotoDetail(item.ID)" v-for="(item,i) in list" :key="i">
              <van-cell :title="item.MEETINGNAME" class="title" value="">
                <template #right-icon v-if="formatData(item.openingtime)>newDate && state==1">
                 <van-button plain type="danger" size="mini">去修改</van-button>
                </template>
              </van-cell>
              <van-cell title="会议时间：" :value="item.openingtime | formatData" />
              <van-cell title="会议地点：" :value="item.MEETINGPLACE" />
            </van-cell-group>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- <van-tab title="已完成会议">
        <van-cell-group>
          <van-cell title="单元格" class="title" />
          <van-cell title="会议时间：" value="2020年12月7日11:27:45" />
          <van-cell title="会议地点：" value="2020年12月7日11:27:45" />
        </van-cell-group>
      </van-tab>
      <van-tab title="我发起的">
        <van-cell-group>
          <van-cell title="单元格" class="title" />
          <van-cell title="会议时间：" value="2020年12月7日11:27:45" />
          <van-cell title="会议地点：" value="2020年12月7日11:27:45" />
        </van-cell-group>
      </van-tab> -->
    </van-tabs>
    <van-button style="position: fixed;
    bottom: 0;" type="danger" block @click="goFabu" v-if="isPartyMember=='Y' ">发布会议</van-button>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import url from "@/service/url-config.js";
import * as dd from "dingtalk-jsapi";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
export default {
  name: "index",
  components: {},
  data() {
    return {
      isPartyMember:"", //是否是党员
      newDate:dayjs(new Date()).format("YYYY-MM-DD HH:mm"),//是否超时
      types: [
        {
          name: "我发起的",
          state: 1,
        },
        {
          name: "我的会议",
          state: 2,
        },
        {
          name: "已完成会议",
          state: 3,
        },
        
      ],
      page: 1,
      pageSize: 10,
      total: 0,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      state: 1,
      Isshow:false,
      time:""
    };
  },
  filters:{
    formatData(v){
      return dayjs(v).format("YYYY-MM-DD HH:mm")
    }
  },
 
  computed: {
   
  },
  methods: {
   formatData(v){
      return dayjs(v).format("YYYY-MM-DD HH:mm")
    },
    goFabu() {
      this.$router.push("/task/send");
    },
    gotoDetail(id) {
      this.$router.push({
        path: "/task/detail",
        query:{meetingId:id,type:this.state}
        });
    },
    onLoad() {
     this.page++;
      this.getMeetingList();
      
    },
    onRefresh() {
      this.page = 1;
      this.getMeetingList();
    },
    handleClick(name) {
      this.page = 1;
      this.state = name +1;
     this.getMeetingList();
    },
    getMeetingList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });

      this.$http
        .post(url.getMeetingList, { 
          userid: userinfo.userId || '061665335038032920',
          rangeType: this.state,
          page: this.page,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.$toast.clear();
          console.log(res);
          this.refreshing = false;
          this.loading = false;

          this.total = res.data.count;
          if (this.list.length == 0 || Math.ceil(this.total / this.pageSize) == this.page || this.total <= this.pageSize) {
            this.finished = true;
          }

          if(res.state==0){
            if (this.page == 1) {
              this.list = res.data.list;
              
            } else {
              this.list.push(...res.data.list);
            }
          }
        });
    },
     // 根据当前登录用户判断是否党员
        getIsPartyMemberByUserid(){
          this.$http.post(url.getIsPartyMemberByUserid,{userid:userinfo.userId || '061665335038032920'}).then(res=>{
            console.log(res)
            this.isPartyMember = res.data.isPartyMember;
          })
        }
  },
  created() {
    this.getMeetingList();
    this.getIsPartyMemberByUserid();
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "会议管理" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 15px;
}
.van-cell-group {
  margin-top: 10px;
}
</style>
