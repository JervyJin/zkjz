<template>
  <div>
    <van-tabs v-model="active" @click="handleChange">
      <van-tab v-for="(item, index) in types" :key="index" :title="item.name">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell-group
              v-for="(item, index) in list"
              :key="index"
              @click="gotoDetail(item.ID)"
            >
              <van-cell :title="item.TITLE" :value="item.UPDATED | formatData">
                <template #right-icon v-if="active == 1">
                  <van-button plain type="danger" size="mini"  style="margin-left: 10px;">去修改</van-button>
                </template>
              </van-cell>
              <van-cell title="" :label="item.CONTENT" />
            </van-cell-group>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-button type="danger" style="position: fixed; bottom: 0" block @click="goFabu" v-if="active == 1"
      >发布</van-button
    >
    <!-- <item :data="data" /> -->
  </div>
</template>

<script>
import url from "@/service/url-config.js";
import dayjs from "dayjs";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
import * as dd from "dingtalk-jsapi";
export default {
  name: "news",
  components: {},
  data() {
    return {
      types: [{ name: "时事要闻" }, { name: "我发布的" }],
      page: 1,
      pageSize: 10,
      list: [],
      total: 0,
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
    this.getNewsList();
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "时事要闻" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
  filters: {
    formatData(v) {
      return dayjs(v).format("YYYY-MM-DD HH:mm");
    },
  },
  methods: {
    ToText(HTML)
  {
      var input = HTML;
      return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
  },

    goFabu() {
      this.$router.push("/news/send");
    },

    // 修改
    gotoDetail(id) {
      this.$router.push({
        path: "/news/detail",
        query: { id: id, type: this.active },
      });
    },
    handleChange(name, title) {
      this.page = 1;
      // console.log(name,title)
      this.getNewsList();
    },
    onLoad() {
      this.page++;
      this.getNewsList();
    },
    onRefresh() {
      this.page = 1;
      this.getNewsList();
    },
    // 新闻list
    getNewsList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
      });

      this.$http
        .post(url.getLearningcolumnList, {
          userid:userinfo.userId || "061665335038032920",
          rangeType: this.active + 1,
          status: 1,
          page: this.page,
          pageSize: this.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.$toast.clear();
          this.refreshing = false;
          this.loading = false;

          this.total = res.data.count;
          if (
            this.list.length == 0 ||
            Math.ceil(this.total / this.pageSize) == this.page ||
            this.total <= this.pageSize
          ) {
            this.finished = true;
          }

          if (this.page == 1) {
            this.list = res.data.list;
            res.data.list.forEach(element => {
              element.CONTENT = this.ToText(element.CONTENT);
            });
          } else {
            this.list.push(...res.data.list);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.van-cell-group {
  margin-top: 10px;
}
.van-icon::before {
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
}
</style>
