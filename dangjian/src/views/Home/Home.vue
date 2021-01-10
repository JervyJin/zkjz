<template>
  <div class="home">
    <!-- 党建平台 -->
    <div class="container">
      <van-grid direction="horizontal" clickable :column-num="2">
        <van-grid-item to="/info">
          <van-image :src="require('@/assets/img/user.png')" />
          <p>党组织</p>
        </van-grid-item>
        <van-grid-item to="/task">
          <van-image :src="require('@/assets/img/meeting.png')" />
          <p>会议管理</p>
        </van-grid-item>
      </van-grid>
      <van-grid direction="horizontal" clickable :column-num="2">
        <van-grid-item to="/news">
          <van-image :src="require('@/assets/img/news.png')" />
          <p>时事要闻</p>
        </van-grid-item>
        <van-grid-item to="/dangjian">
          <van-image :src="require('@/assets/img/dangjian.png')" />
          <p>党建动态</p>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="news">
      <div class="title">
        <span class="title_text">时事要闻</span>
        <router-link :to="{path:'/news'}" tag="span" class="title_more">更多<van-icon name="arrow" style="vertical-align: text-bottom;"/></router-link>
      </div>
      <van-cell-group v-for="(v, i) in newsList" :key="i">
        <router-link :to="{ path: '/news/detail', query: { id: v.ID } }">
          <van-cell :title="v.TITLE" :value="v.UPDATED | formatData" :label="v.CONTENT" />
        </router-link>
      </van-cell-group>
    </div>
    <div class="news">
      <div class="title">
        <span class="title_text">党建动态</span>
        <router-link :to="{path:'/dangjian'}" tag="span" class="title_more">更多<van-icon name="arrow" style="vertical-align: text-bottom;"/></router-link>
      </div>
      <van-cell-group v-for="(v, i) in dangjianList" :key="i">
        <router-link :to="{ path: '/dangjian/detail', query: { id: v.ID } }">
          <van-cell :title="v.TITLE" :value="v.UPDATED | formatData" :label="v.CONTENT" />
        </router-link>
      </van-cell-group>
    </div>
  </div>
</template>

<script src="https://g.alicdn.com/gdt/jsapi/1.3.2/index.js"></script>
<script>

import url from "@/service/url-config.js";
import dayjs from 'dayjs'
import config from '@/service/config'
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载


export default {
  name: "Home",
  
  data() {
    return {
      code: "",
      corpId: config.corpId,
      userinfo:{},

      newsList:[],
      dangjianList:[]

    };
  },
  filters:{
    formatData(v){
      return dayjs(v).format("YYYY-MM-DD")
    }
  },
  methods: {
    ToText(HTML)
  {
      var input = HTML;
      return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
  },

    // 获取微应用免登授权码
    getAccessLoginCode() {
      if (dd.env.platform !== "notInDingTalk") {
        let _this = this;
        dd.ready(() => {
          dd.runtime.permission.requestAuthCode({
            corpId: _this.corpId,
            onSuccess: function(result) {
              console.log(result)
              console.log("获取code成功:", JSON.stringify(result.code));
              _this.code = result.code;
              console.log(_this.code)

              _this.getUser();
            },
            onFail: function(err) {
              console.log("获取code失败:");
              alert(JSON.stringify(err));
            }
          });
        });
        dd.error(error => {
          alert(`error: corpId=${config.corpId},appId=${config.appId}`);
          alert(`dd error: ${JSON.stringify(error)}`);
        });
      }
    },

    /* 调用后台接口获取当前用户信息 */
    getUser(){
      this.$http.post(url.getUser,{
        code:this.code
      })
      .then(res=>{
        console.log(res,888)
        this.userinfo = res;
        
        // 把获取到的用户信息储存到localStorage中
        window.localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
        this.$store.commit("userinfo",res)
        
      })
    },
    // 获取首页要闻、党建动态 列表
    getList(type){
      let query = {
        userid:this.userinfo.userId || '061665335038032920',
        rangeType:1,
        status:type==1 ? 1 : 2,
        page:1,
        pageSize:4
      };
      this.$http.post(url.getLearningcolumnList,query).then(res=>{
        if(type==1) this.newsList = res.data.list;
        if(type==2) this.dangjianList = res.data.list;
        res.data.list.forEach(element => {
              element.CONTENT = this.ToText(element.CONTENT);
            });
      })
    }
    
  },
  created() {
    this.getAccessLoginCode();
    this.getList(1);//要闻
    this.getList(2);//党建

    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "首页" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  .container {
    padding: 20px 0;
  }
  .van-image {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  /deep/.van-cell-group {
    margin: 10px 0;
  }
  /deep/.van-cell__title{
        overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .news {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title_text {
        font-size: 17px;
        font-weight: 600;
        &::before {
          display: inline-block;
          vertical-align: middle;
          content: "";
          width: 3px;
          height: 16px;
          background: crimson;
          margin-right: 8px;
        }
      }
      .title_more {
        font-size: 12px;
        color: #e11715;
      }
    }
  }
}
</style>
