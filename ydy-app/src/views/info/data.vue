<template>
  <div class="page">
    <div class="search">
      <van-search
        v-model="taskName"
        show-action
        placeholder="可搜索点位名称"
        @search="onSearch"
        @clear="onCancel"
      >
        <template #action>
          <van-button type="primary" @click="onSearch" size="small">搜索</van-button>
        </template>
      </van-search>
  </div>

  <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了"
    @load="onLoad">
    <template v-if="taskList.length">
      <div class="item" v-for="v in taskList" :key="v.id">
        <div class="item-name"><van-icon name="todo-list-o" color="#2D72E0" />{{v.name}}</div>
        <div class="item-content">
          <div>点位编号：{{v.pointCode}}</div>
          <div>车道号：{{v.laneNum}}</div>
          <div>通过时间：{{v.passingTime}}</div>
          <div>速度：{{v.speed}}</div>
          <div>判定结果：{{v.speed}}</div>
        </div>
    </div>
    </template>
    <div class="nodata" v-else>
      暂无数据
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
      taskName: '',
      pagePram: {
        page: 1,
        pageSize: 10
      },
      taskList: [],
      loading: false, //加载状态
      finished: false, //加载完成状态
    }
  },
  created () {
    this.getData();
  },
  methods: {
    // 查询列表
    onSearch() {
      this.getData(1);
    },
    // 清除输入框
    onCancel() {
      this.taskName = '';
    },
    // 获取数据
    getData (v) {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      if(v) {
        this.pagePram.page = 1;
        this.taskList = [];
      }
      let queryPram = {
        name: this.taskName,
        page: this.pagePram.page,
        pageSize: this.pagePram.pageSize
      };
      this.$http.post(url.MonitoringListApp, queryPram).then(res => {
        toast.clear();
        this.loading = false;
        if(res.success) {
          if (!res.data.length) {
            this.finished = true;
          }
          this.taskList = [...this.taskList, ...res.data];
        }
      })
    },
    // 滚动加载分页请求
    onLoad () {
      this.pagePram.page ++;
      this.getData();
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
      /deep/ .van-search__action {
        margin-top: -3px;
      }
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
