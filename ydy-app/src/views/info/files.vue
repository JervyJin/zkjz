<template>
  <div class="page">
    <div class="search">
      <van-search
        v-model="params.lisence"
        show-action
        placeholder="可搜索车牌"
        @search="onSearch"
        @cancel="onCancel"
      >
        <template #action>
          <van-button type="primary" @click="onSearch" size="small">搜索</van-button>
        </template>
      </van-search>
  </div>
<van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了"
    @load="onLoad">
  <div class="item" v-for="(v,index) in tableData" :key="index" @click="clickHandle(v)">
    <div class="item-name"><van-icon name="todo-list-o" color="#2D72E0" />{{v.lisence}}</div>
    <div class="item-content">
      <div>车牌颜色：{{v.lisencecolor==0 ? '黄牌':'蓝牌'}}</div>
      <div>号牌种类：{{v.lisencetype}}</div>
      <div>车辆型号：{{v.carmodel}}</div>
      <div>最大重质量：{{v.quality}}</div>
    </div>
  </div>
</van-list>
  </div>
</template>

<script>
import url from '@/service/url-config.js';
import { Toast } from "vant";
export default {
  name: "todo",
  data() {
    return {
      loading: false, //加载状态
      finished: false, //加载完成状态
      params:{
        page: 1,
        rows: 10,
      lisence: '',
      },
      tableData: []
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData(v) {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      if(v) {
        this.params.page =1;
        this.tableData = [];
      }
      this.$http.post(url.getCarGearList, this.params).then(res => {
        // console.log(res,'88888')
        toast.clear();
         this.loading = false;
        if (!res.data.list.length) {
          this.finished = true;
        }
        
        this.tableData = [...this.tableData,...res.data.list]
      })
    },
    // 点击1条任务进入任务详情
    clickHandle(row) {
      this.$router.push({path: '/info/detail/files', query: {lisence: row.lisence}});
    },
    // 滚动加载分页请求
    onLoad () {
      this.params.page ++;
      this.getData();
    },
    onSearch() {
      this.getData(1);
      
    },
    onCancel() {

    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    background: #F8F8F8;
    height: calc(100vh - 44px);
    overflow-y: auto;
    .search {
      background: #fff;
      // padding: 7px 15px;
    }

    .query {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 40px;
      width: 100%;
      border-top: .5px solid #E7E7E7;
      border-bottom: .5px solid #E7E7E7;
      background: #fff;
      div {
        flex-grow: 1;
        text-align: center;
      }
      .second{
        border-left: .5px solid #E7E7E7;
        border-right: .5px solid #E7E7E7;
      }
    }

    .item {
      background: #fff;
      padding: 0 15px;
      margin-bottom: 10px;
      .item-name {
        border-bottom: .5px solid #E7E7E7;
        padding: 8px 0;
        line-height: 24px;
        font-size: 17px;
        color: #333333;
        /deep/ .van-icon {
          vertical-align: middle;
          margin-right: 6px;
        }
      }
      .item-content {
        padding: 13px 0 2px;
        font-size: 15px;
      }
      .item-content div{
        padding-bottom: 8px;
      }
      .item-content div.level1{
        color: #F22424;
      }
      .item-content div.level2{
        color: #FFC000;
      }
      .item-content div.level3{
        color: #70AC48;
      }
    }
  }
</style>
