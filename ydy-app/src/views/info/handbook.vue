<template>
  <div class="page">
    <div class="search">
      <van-search
        v-model="formInline.name"
        show-action
        placeholder="可搜索手册名称"
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
    <div class="item" v-for="v in tableData" :key="v.id">
      <div class="item-name"><van-icon name="todo-list-o" color="#2D72E0" />{{v.name}}</div>
      <div class="item-content">
        <div>执行机构：{{v.carryOrg}}</div>
        <div>修订日期：{{v.reviseDate}}</div>
        <div>实施日期：{{v.carryDate}}</div>
        <div class="file" @click="downloadFile(v)">附件名称：{{v.file && v.file.length && v.file[0].name || ''}}</div>
      </div>
    </div>
  </van-list>

  </div>
</template>

<script>
import url from '@/service/url-config.js';
import config from '@/service/config.js';
import { Toast } from "vant";
export default {
  name: "todo",
  data() {
    return {
      formInline: {
        name: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      loading: false, //加载状态
      finished: false, //加载完成状态

    }
  },
  created() {
    this.getData();
  },
  methods: {
    onLoad() {
      this.formInline.pageIndex ++ ;
      this.getData();
    },
    getData(v) {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      if(v) {
        this.formInline.pageIndex = 1;
        this.tableData = []
      }
      this.$http.post(url.getHandbook, this.formInline).then(res => {
        toast.clear();
        this.loading = false;
        if (!res.data.list.length) {
          this.finished = true;
        }
        this.tableData = [...this.tableData, ...res.data.list];
      })
    },
    onSearch() {
      this.getData(1);
    },
    onCancel() {

    },
    // 点击1条任务进入任务详情
    clickHandle(row) {
      this.$router.push({path: '/info/detail/handbook', query: {id: row.id}});
    },
    // 下载附件
    downloadFile(row) {
      window.open(`${config.api_base}/system/file/downloadFile?id=${row.file[0].id}`)
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
      font-size: 13px;
      div {
        flex-grow: 1;
        text-align: center;
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
        .file {
          color: #70AC48;
        }
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
