<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{isCX ? '执法任务查询' : isYb ? '已办任务' : '待办任务'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <template v-if="!isDetail">
      <List :isYb="isYb" @showDetail="showDetail"/>
    </template>
    <template v-else>
      <Detail :isYb="isYb" :selectRow="selectRow" @showDetail="showDetail" @goBack="goBack"/>
    </template>
  </div>
</template>

<script>
import List from './children/list.vue'
import Detail from './children/detail.vue'
import url from '@/servers/url-config.js'
export default {
  components: {
    List,
    Detail
  },
  computed: {
    isYb() {
      return this.$route.path.indexOf('ybrw') > -1
    },
    isCX() {
      return this.$route.path.indexOf('rwcx') > -1
    }
  },
  watch: {
    $route() {
      this.isDetail = false;
    }
  },
  data() {
    return {
      isDetail: false,
      selectRow: null
    }
  },
  created () {
    // 从双随机任务跳转过来
    if (this.$route.params.detail) {
      this.$ajax(url.getTaskDetailById, {id: this.$route.params.detail}).then(res => {
        let detailData = res;
        this.showDetail(detailData);
      })
    }
  },
  methods: {
    showDetail(o) {
      this.isDetail = true;
      this.selectRow = o;
    },
    // 关闭任务办理页
    goBack (ev) {
      // 再跳回双随机
      if (this.$route.path.indexOf('dbrw') > -1 && ev === '2') {
        this.$router.push({
          path: '/zfxt/doubleRandom',
        })
      } else if (this.$route.path.indexOf('dbrw') > -1 && ev !== '2' && this.$route.query.id) {
        this.$router.push({
          path: '/zfxt/dbrw',
        })
      } else {
        this.isDetail = false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .page {
    height: 100%;
    overflow-y: hidden;
  }
</style>
