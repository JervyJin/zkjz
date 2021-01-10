<template>
  <div class="page">
    <div class="search">
      <van-search
        v-model="query.taskName"
        show-action
        placeholder="可搜索任务名称"
        @search="onSearch"
        @cancel="onCancel"
      >
        <template #action>
          <van-button type="primary" @click="onSearch" size="small">搜索</van-button>
        </template>
      </van-search>
    </div>

    <van-dropdown-menu>
      <van-dropdown-item
        v-model="query.taskType" 
        :options="dicts.taskType"
        @change="changeOptions"
      />
      <van-dropdown-item
        v-model="query.urgency" 
        :options="dicts.urgency"
        @change="changeOptions1"
      />
      <!-- <van-dropdown-item
        v-model="query.dispatchDate" 
        :options="dicts.options"
        @change="changeOptions2"
      /> -->
    </van-dropdown-menu>

    <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了"
      @load="onLoad">
      <div class="item" v-if="data.length" v-for="(v, index) in data" :key="index" @click="handleTap(v)">
        <div class="item-name">
          <van-icon name="bulb-o" :color="v.urgency == 2 ? '#F22424' : '#70AC48'" />
          {{v.taskName}}
        </div>
        <div class="item-content">
          <div>任务类型：{{v.taskTypeName}}</div>
          <div>要求完成时间：{{v.requireFinishTime}}</div>
          <div>主要内容：{{v.taskComment}}</div>
          <div :class="v.urgency == 2 ? 'level1' : 'level3'">紧急程度：{{v.urgency == 2 ? '紧急' : '一般'}}</div>
        </div>
      </div>
      <div class="nodata" v-else>
        暂无数据
      </div>
    </van-list>
  </div>

</template>

<script>
import url from '@/service/url-config.js';
import querys from 'components/querys'
import { Toast } from "vant";
export default {
  name: "done",
  components: {
    querys
  },
  data() {
    return {
      data: [],
      loading: false, //加载状态
      finished: false, //加载完成状态

      query: {
        dbType: 1,
        taskName: '',
        taskType: '',
        urgency: '',
        pageIndex: 1,
        pageSize: 10
        // dispatchDate: ''
      },
      dicts: {
        taskType: [],
        urgency: [],
        options: [{text: '派发日期', value: ''}]
      }
    }
  },
  created() {
    this.getTodoList();
    this.getDictData(3, 'taskType');
    this.getDictData(5, 'urgency');
    this.$store.commit('setShowIllegal', false);
  },
  methods: {
    // 获取字典树
    getDictData(type, arr) {
      this.$http.post(url.getDictOption, {
        type: type
      }).then(res => {
        let text = arr == 'taskType' ? '任务类别' : '紧急程度'
        this.dicts[arr] = [{text,
          value: ''}].concat(res.map(v => ({
          id: v.id,
          text: v.name,
          value: v.code
        })))
      })
    },
    // 获取页面数据-待办列表
    getTodoList(v) {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      if(v) {
        this.query.pageIndex = 1;
        this.data = [];
      }
      this.$http.post(url.getTaskList, this.query).then(res => {
        toast.clear();
        this.loading = false;
        if (!res.list.length) {
          this.finished = true;
        }
        this.data = [...this.data, ...res.list];
      })
    },
    onSearch() {
      this.getTodoList(1);
    },
    onCancel() {

    },
    // 完善违法信息
    addItemInfo() {
      this.$router.push('/task/illegal');
    },
    // 切换选择条件
    changeOptions(v) {
       this.getTodoList(1);
    },
    // 切换选择条件
    changeOptions1(v) {
      this.getTodoList(1);
    },
    
    handleTap(row) {
      this.$store.commit('setSelectRow', row);
      let id = row.id;
      this.$router.push({name: 'taskDetail', query: {id, isDone: true}});
    },
    onLoad() {
      this.query.pageIndex ++ ;
      this.getTodoList();
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
      .item-info {
        height: 47px;
        line-height: 47px;
        font-size: 15px;
        color: #999999;
        text-align: right;
        border-top: .5px solid #E7E7E7;
        /deep/ .van-icon {
          vertical-align: middle;
        }
      }
    }
  }
</style>
