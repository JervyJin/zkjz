<template>
  <div class="page">
    <van-nav-bar
      title="追加固定问题"
      left-arrow
      @click-left="save"
    >
    </van-nav-bar>
    <van-cell v-for="v in questions" :key="v.id">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <van-checkbox-group v-model="result">
          <van-checkbox :name="v" shape="square">{{v.question}}</van-checkbox>
        </van-checkbox-group>
      </template>
    </van-cell>
    <van-button class="btn" type="info" block @click="save">确 定</van-button>
  </div>
</template>

<script>
import url from "@/service/url-config.js";
export default {
  data() {
    return {
      result: [],
      questions: []
    }
  },
  created() {
    this.getListNoDisplay();
  },
  methods: {
    // 获取不固定展示问题
    getListNoDisplay() {
      this.$http.post(url.getListNoDisplay, {}).then(res => {
        if(res.success) {
          this.questions = res.data;
        }
      })
    },
    save() {
      // this.$store.commit('setSelectQuestions', this.result);
      // this.$router.back();
      this.$emit('ensure', this.result);
    }
  }
}
</script>

<style scoped lang="less">
  .page{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    z-index: 10000;
    background: #fff;
    .btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
